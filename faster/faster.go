package faster

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math"
	"os"
	"path"
	"path/filepath"
	"strings"
	"sync"
	"text/template"
	"time"

	"github.com/fsnotify/fsnotify"
	"github.com/hesusruiz/vcutils/yaml"

	"github.com/evanw/esbuild/pkg/api"

	"log"

	"github.com/otiai10/copy"
)

func LookupEnvOrString(key string, defaultVal string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defaultVal
}

func BuildFront(configFile string) (api.BuildResult, error) {

	// Load the configuration
	config, err := LoadConfig(configFile)
	if err != nil {
		return api.BuildResult{}, err
	}

	return Build(config)
}

func WatchAndBuild(configFile string) error {
	// Load the configuration
	config, err := LoadConfig(configFile)
	if err != nil {
		return err
	}

	watchAndBuild(config)
	return nil
}

// Build performs a standard Build
func Build(config *Config) (api.BuildResult, error) {
	// processTemplates(cfg)
	source := config.Sourcedir
	target := config.Targetdir

	fmt.Printf("Building: %s --> %s\n", source, target)

	preprocess(config)
	result := buildAndBundle(config)
	// processResult(result, cfg)
	copyStaticAssets(config)
	postprocess(result, config)

	return result, nil

}

// preprocess is executed before build, for example to clean the target directory
func preprocess(config *Config) {
	if config.CleanTarget {
		deleteTargetDir(config)
	}
}

// Clean the target directory from all build artifacts
func deleteTargetDir(config *Config) {
	targetDir := config.Targetdir
	if targetDir == "" {
		log.Println("Warning: targetdir is empty, skipping deletion.")
		return
	}
	if len(targetDir) > 0 {
		os.RemoveAll(targetDir)
	}
}

// buildAndBundle uses ESBUILD to build and bundle js/css files
func buildAndBundle(config *Config) api.BuildResult {

	// Generate the options structure
	options := buildOptions(config)

	// Run ESBUILD
	result := api.Build(options)

	// Print any errors
	printErrors(result.Errors)
	if len(result.Errors) > 0 {
		os.Exit(1)
	}

	return result

}

var riteOnLoadPlugin = api.Plugin{
	Name: "example",
	Setup: func(build api.PluginBuild) {
		// Load ".js" files and process any Rite text in the html tags
		build.OnLoad(api.OnLoadOptions{Filter: `\.js$`},
			func(args api.OnLoadArgs) (api.OnLoadResult, error) {
				if !strings.Contains(args.Path, "src/pages") {
					return api.OnLoadResult{}, nil
				}

				// text, err := os.ReadFile(args.Path)
				// if err != nil {
				// 	return api.OnLoadResult{}, err
				// }

				// fmt.Println("--plugin-- ", args.Path)
				return api.OnLoadResult{}, nil

				// contents := string(text)

				// return api.OnLoadResult{
				// 	Contents: &contents,
				// 	Loader:   api.LoaderJS,
				// }, nil
			})
	},
}

// Generate the build options struct for ESBUILD
func buildOptions(config *Config) api.BuildOptions {

	// The base input directory of the project
	sourceDir := config.Sourcedir

	// Build an array with the relative path of the main entrypoints
	var entryPoints []string
	for _, k := range config.EntryPoints {
		entryPoints = append(entryPoints, filepath.Join(sourceDir, k))
	}

	// The pages are also entrypoints to process, because they are lazy-loaded
	pages := pageEntryPoints(config)

	// Consolidate all entrypoints in a single list
	entryPoints = append(entryPoints, pages...)

	options := api.BuildOptions{
		// AbsWorkingDir: "Put here the working directory for the build",

		// Build for the browser
		Platform: api.PlatformBrowser,

		// These are the main files (entrypoints) to be processed
		EntryPoints:       entryPoints,
		Format:            api.FormatESModule,
		Plugins:           []api.Plugin{riteOnLoadPlugin},
		Outdir:            config.Targetdir,
		Write:             true,
		Bundle:            true,
		Splitting:         true,
		ChunkNames:        "chunks/[name]-[hash]",
		Charset:           api.CharsetUTF8,
		MinifyWhitespace:  false,
		MinifyIdentifiers: false,
		MinifySyntax:      false,
		Define: map[string]string{
			"JR_IN_DEVELOPMENT": "true",
		},
		Loader: map[string]api.Loader{
			".png": api.LoaderDataURL,
			".svg": api.LoaderDataURL,
		},
		// Generate sourcemaps for better debugging
		Sourcemap:      api.SourceMapLinked,
		SourcesContent: api.SourcesContentInclude,
		Metafile:       true,
	}

	if config.HashEntrypointNames {
		options.EntryNames = "[dir]/[name]-[hash]"
	}

	return options
}
func buildProductionOptions(config *Config) api.BuildOptions {

	// The base input directory of the project
	sourceDir := config.Sourcedir

	// Build an array with the relative path of the main entrypoints
	entryPoints := config.EntryPoints
	for i := range entryPoints {
		entryPoints[i] = filepath.Join(sourceDir, entryPoints[i])
	}

	// The pages are also entrypoints to process, because they are lazy-loaded
	pages := pageEntryPoints(config)

	// Consolidate all entrypoints in a single list
	entryPoints = append(entryPoints, pages...)

	options := api.BuildOptions{
		EntryPoints: entryPoints,
		Format:      api.FormatESModule,
		Plugins:     []api.Plugin{riteOnLoadPlugin},
		Outdir:      config.Targetdir,
		Write:       true,
		Bundle:      true,
		Splitting:   true,
		ChunkNames:  "chunks/[name]-[hash]",
		Define: map[string]string{
			"JR_IN_DEVELOPMENT": "true",
		},
		Loader: map[string]api.Loader{
			".png": api.LoaderDataURL,
			".svg": api.LoaderDataURL,
		},
		Metafile: true,
		Charset:  api.CharsetUTF8,
	}

	if config.HashEntrypointNames {
		options.EntryNames = "[dir]/[name]-[hash]"
	}

	return options
}

// postprocess is executed after the build for example to modify the resulting files
func postprocess(r api.BuildResult, config *Config) error {

	// // Print the output structure
	// fmt.Println("Output files:")
	// for _, ofile := range r.OutputFiles {
	// 	fmt.Println(ofile.Path)
	// }
	// fmt.Println("================")

	// Get the metafile data and parse it as a string representing a JSON file
	meta, err := yaml.ParseJson(r.Metafile)
	if err != nil {
		return err
	}

	// var m map[string]any
	// json.Unmarshal([]byte(r.Metafile), &m)
	// metaOut, _ := json.MarshalIndent(m, "", "  ")
	// fmt.Println(string(metaOut))

	// Get the outputs field, which is a map with the key as each output file name
	outputs := meta.Map("outputs")
	// printJSON(outputs)

	targetFullDir := config.PageDir

	// The base input directory of the project
	sourceDir := config.Sourcedir

	// Build an array with the relative path of the main entrypoints
	var entryPoints []string
	for _, k := range config.EntryPoints {
		entryPoints = append(entryPoints, path.Join(sourceDir, k))
	}

	// Get a map of the source entrypoints full path, by getting the list in the config file
	entryPointsMap := map[string]bool{}
	for i := range entryPoints {
		entryPointsMap[entryPoints[i]] = true
	}

	// Get a list of the pages of the application, to generate the routing page map
	// This is the list of file path names in the pagesdir directory, relative to sourcedir
	pageSourceFileNames := pageEntryPointsAsMap(config)

	// pageNamesMapping will be a mapping between the page name (the file name without the path and extension),
	// and the full file path for the corresponding target file with the JavaScript code for the page.
	// This will be used for dynamic loading of the code when routing to a given page name. The router will
	// dynamically load the JavascriptFile before giving control to the page entry point
	pageNamesMapping := map[string]string{}

	// rootEntries is an array with the target name of the entry point (possibly including its hash in the name),
	// and the CSS file bundle that is associated to that entry point (possibly because some CSS was imported by the entrypoint
	// or its dependencies).

	type rootEntry struct {
		EntryPoint string
		CssBundle  string
	}
	var rootEntries []rootEntry

	// Iterate over all output files in the metadata file
	// Find the source entrypoint in the output metadata map
	for outFile, metaData := range outputs {
		outMetaEntry := yaml.New(metaData)

		// The name of the source entrypoint file
		outEntryPoint := outMetaEntry.String("entryPoint")
		if len(outEntryPoint) == 0 {
			continue
		}
		fmt.Println(outEntryPoint, "-->", outFile)
		cssBundle := outMetaEntry.String("cssBundle")
		if len(cssBundle) > 0 {
			fmt.Println("    cssBundle:", cssBundle)
		}

		// Get the base name for the outfile of the entrypoint
		outFileBaseName := filepath.Base(outFile)

		// If the entry point of this outfile is in the configured list of entrypoints
		if entryPointsMap[outEntryPoint] {

			re := rootEntry{}
			re.EntryPoint = path.Join(config.Subdomainprefix, filepath.Base(outFile))
			if len(outMetaEntry.String("cssBundle")) > 0 {
				re.CssBundle = filepath.Base(outMetaEntry.String("cssBundle"))
			}

			rootEntries = append(rootEntries, re)

		}

		// If this entry corresponds to a file in the source page directory
		if pageSourceFileNames[outEntryPoint] {

			// Get the page pageName (the pageName of the file without path or extension)
			pageName := strings.TrimSuffix(path.Base(outEntryPoint), path.Ext(path.Base(outEntryPoint)))

			// Get the path of the file in the output, relative to the target directory for serving the file
			targetPageFilePath := path.Join(targetFullDir, outFileBaseName)

			// Add an entry in the page mapping
			pageNamesMapping[pageName] = targetPageFilePath

		}
	}

	printJSON(rootEntries)

	// We are going to modify the HTML files to:
	// - Load the JavaScript main entrypoints
	// - Load the associated CSS bundles (one for each entrypoint)

	pageNamesMappingJSON, _ := json.MarshalIndent(pageNamesMapping, "", "  ")

	indexFiles := config.HtmlFiles

	for _, indexf := range indexFiles {
		fmt.Println(indexf)
		indexFilePath := path.Join(config.Targetdir, indexf)

		// Read the contents of the output HTML file
		bytesOut, err := os.ReadFile(indexFilePath)
		if err != nil {
			log.Fatal(err)
		}

		templateInputData := map[string]any{
			"PageModules": string(pageNamesMappingJSON),
			"EntryPoints": rootEntries,
		}

		te := template.Must(template.New("letter").Parse(string(bytesOut)))
		var templateoutputBuffer bytes.Buffer
		err = te.Execute(&templateoutputBuffer, templateInputData)
		if err != nil {
			log.Println("executing template:", err)
		}
		bytesOut = templateoutputBuffer.Bytes()

		// Overwrite file with modified contents
		err = os.WriteFile(indexFilePath, bytesOut, 0755)
		if err != nil {
			log.Fatal(err)
		}

	}

	return nil

}

func buildDeps(config *Config) api.BuildResult {
	// processTemplates(cfg)

	preprocess(config)
	result := buildDependencies(config)

	return result

}

// pageEntryPointsAsMap returns a map with all source page file names (path relative to sourcedir) in the application,
// which will be entrypoints for the building process.
func pageEntryPointsAsMap(config *Config) map[string]bool {

	// The directory where the pages are located
	pageDir := path.Join(config.Sourcedir, config.PageDir)

	// Get the files in the directory
	files, err := os.ReadDir(pageDir)
	if err != nil {
		log.Fatal(err)
	}

	// Create the list of pages with the full path (relative to the sourcedir directory)
	pageMap := map[string]bool{}
	for _, file := range files {
		pageMap[path.Join(pageDir, file.Name())] = true
	}

	return pageMap
}

func buildOptionsDependencies(config *Config) api.BuildOptions {

	// The JavaScript entrypoints
	entryPoints := config.Dependencies

	options := api.BuildOptions{
		EntryPoints: entryPoints,
		Format:      api.FormatESModule,
		Outdir:      config.Targetdir,
		Write:       true,
		Bundle:      true,
		Splitting:   false,
		ChunkNames:  "chunks/[name]-[hash]",
		Loader: map[string]api.Loader{
			".png": api.LoaderDataURL,
			".svg": api.LoaderText,
		},

		// EntryNames: "[dir]/[name]-[hash]",
		// Metafile:   true,
	}

	return options
}

func buildDependencies(config *Config) api.BuildResult {
	fmt.Println("Building dependencies")

	options := buildOptionsDependencies(config)
	result := api.Build(options)

	printErrors(result.Errors)
	if len(result.Errors) > 0 {
		os.Exit(1)
	}

	return result
}

func printErrors(resultErrors []api.Message) {
	if len(resultErrors) > 0 {
		for _, msg := range resultErrors {
			fmt.Printf("%v\n", msg.Text)
		}
	}
}

// copyStaticAssets copies without any processing the files from the staticAssets directory
// to the target directory in the root.
// The structure of the source directory is replicated in the target.
// A file 'images/example.png' in the source staticAssets directory will be accessed as '/images/example.png'
// via the web.
func copyStaticAssets(config *Config) {
	sourceDir := config.StaticAssets.Source
	targetDir := config.StaticAssets.Target

	// Copy the source directory to the target root
	err := copy.Copy(sourceDir, targetDir)
	if err != nil {
		panic(err)
	}

	// HTML files are a special case of static assets. The common case for a PWA is that there is just
	// one html file in the root of the project source directory.
	// In the future, the 'htmlfiles' entry may be used to pre-process the html files in special ways
	pages := config.HtmlFiles

	sourceDir = config.Sourcedir
	targetDir = config.Targetdir

	// Copy all HTML files from source to target
	for _, page := range pages {
		sourceFile := filepath.Join(sourceDir, page)
		targetFile := filepath.Join(targetDir, page)
		// copyFile(sourceFile, targetFile)
		copy.Copy(sourceFile, targetFile)
	}

}

// pageEntryPoints returns an array with all pages in the application, which will be entrypoints
// for the building process.
func pageEntryPoints(config *Config) []string {

	// The directory where the pages are located
	pageDir := filepath.Join(config.Sourcedir, config.PageDir)

	// Get the files in the directory
	files, err := os.ReadDir(pageDir)
	if err != nil {
		log.Fatal(err)
	}

	// Create the list of pages with the full path
	pageList := make([]string, len(files))
	for i, file := range files {
		pageList[i] = filepath.Join(pageDir, file.Name())
	}

	return pageList
}

func printJSON(val any) {
	out, err := json.MarshalIndent(val, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
}

func processTemplates(config *Config) {

	parseGlob := filepath.Join(config.Templates.Dir, "*.tpl")

	t, err := template.ParseGlob(parseGlob)
	if err != nil {
		panic(err)
	}

	var out bytes.Buffer

	for _, elem := range config.Templates.Elems {
		ele := yaml.New(elem)
		name := ele.String("name")
		data := ele.Map("data")
		fmt.Printf("Name: %v Data: %v\n", name, data)
		err = t.ExecuteTemplate(&out, name, data)
		if err != nil {
			panic(err)
		}
		// fmt.Println(string(out.Bytes()))
	}

}

// Depending on the system, a single "write" can generate many Write events; for
// example compiling a large Go program can generate hundreds of Write events on
// the binary.
//
// The general strategy to deal with this is to wait a short time for more write
// events, resetting the wait period for every new event.
func watchAndBuild(config *Config) {

	Build(config)

	// Create a new watcher.
	w, err := fsnotify.NewWatcher()
	if err != nil {
		fmt.Printf("creating a new watcher: %s", err)
		os.Exit(1)
	}
	defer w.Close()

	// Start listening for events.
	go dedupLoop(w, config)

	// Watch the source directory
	err = w.Add(config.Sourcedir)
	if err != nil {
		fmt.Printf("%q: %s", config.Sourcedir, err)
		os.Exit(1)
	}

	// Watch the pages directory
	watchDir := path.Join(config.Sourcedir, config.PageDir)
	err = w.Add(watchDir)
	if err != nil {
		fmt.Printf("%q: %s", watchDir, err)
		os.Exit(1)
	}

	// Watch the components directory
	watchDir = path.Join(config.Sourcedir, config.Components)
	err = w.Add(watchDir)
	if err != nil {
		fmt.Printf("%q: %s", watchDir, err)
		os.Exit(1)
	}

	// Watch the Public assets directory
	watchDir = path.Join(config.Sourcedir, config.Public)
	err = w.Add(watchDir)
	if err != nil {
		fmt.Printf("%q: %s", watchDir, err)
		os.Exit(1)
	}

	printTime("ready; press ^C to exit")
	<-make(chan struct{}) // Block forever
}

func printTime(s string, args ...interface{}) {
	fmt.Printf(time.Now().Format("15:04:05.0000")+" "+s+"\n", args...)
}

func dedupLoop(w *fsnotify.Watcher, config *Config) {
	var (
		// Wait 100ms for new events; each new event resets the timer.
		waitFor = 100 * time.Millisecond

		// Keep track of the timers, as path → timer.
		mu     sync.Mutex
		timers = make(map[string]*time.Timer)

		// Callback we run.
		performBuild = func(e fsnotify.Event) {
			printTime(e.String())
			Build(config)

			// Don't need to remove the timer if you don't have a lot of files.
			mu.Lock()
			delete(timers, e.Name)
			mu.Unlock()
		}
	)

	for {
		select {
		// Read from Errors.
		case err, ok := <-w.Errors:
			if !ok { // Channel was closed (i.e. Watcher.Close() was called).
				return
			}
			printTime("ERROR: %s", err)
		// Read from Events.
		case e, ok := <-w.Events:
			if !ok { // Channel was closed (i.e. Watcher.Close() was called).
				return
			}

			// We just want to watch for file creation, so ignore everything
			// outside of Create and Write.
			if !e.Has(fsnotify.Create) && !e.Has(fsnotify.Write) {
				continue
			}

			// Get timer.
			mu.Lock()
			t, ok := timers[e.Name]
			mu.Unlock()

			// No timer yet, so create one.
			if !ok {
				t = time.AfterFunc(math.MaxInt64, func() { performBuild(e) })
				t.Stop()

				mu.Lock()
				timers[e.Name] = t
				mu.Unlock()
			}

			// Reset the timer for this path, so it will start from 100ms again.
			t.Reset(waitFor)
		}
	}
}
