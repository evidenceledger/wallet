package faster

import (
	"fmt"
	"os"

	"github.com/goccy/go-yaml"
)

// Config paramneters for the development server
type Config struct {

	// Build environment (production or development)
	Environment string `yaml:"environment"`

	// The directory with the source files for the PWA, relative to current directory
	Sourcedir string `yaml:"sourcedir"`

	// The distribution files after building the app, relative to current directory
	Targetdir string `yaml:"targetdir"`

	// If cleantarget is true, erase the 'targetdir' before building
	CleanTarget bool `yaml:"cleantarget"`

	// The individual HTML files composing the application, relative to the 'sourcedir'
	HtmlFiles []string `yaml:"htmlfiles"`

	// The JavaScript files which are the entrypoints (normally included in the HTML files),
	// relative to the 'sourcedir'
	EntryPoints []string `yaml:"entryPoints"`

	// The directory whith the source javascipt for the app pages, relative to 'sourcedir'
	PageDir string `yaml:"pagedir"`

	// Directory with files that will be copied to target without any processing.
	// ATTENTION: name is relative to the root of the project, not to 'sourcedir'.
	// This means that static assets can be located anywhere in the project directory.
	StaticAssets StaticAssets `yaml:"staticAssets"`

	// Set to true if you want entrypoint names to include a hash in the distribution
	HashEntrypointNames bool `yaml:"hashEntrypointNames"`

	// Set this when the application will run under a prefix (e.g. Github Pages)
	Subdomainprefix string `yaml:"subdomainprefix"`

	// Configuration specific to the development server process
	// In addition to serving local content, the server can forward some requests from the frontend to other
	// servers, helping development flows in complex projects
	Devserver Devserver `yaml:"devserver"`

	// Not yet used.
	Dependencies []string `yaml:"dependencies"`

	// Not yet used
	Templates Templates `yaml:"templates"`

	// Not yet used
	Components string `yaml:"components"`

	// Not yet used
	Public string `yaml:"public"`
}

// StaticAssets specifies the files that will be copied verbatim, with no processing
type StaticAssets struct {
	// The source directory, relative to the root of the project, not to 'sourcedir'
	Source string `yaml:"source"`
	// The target directory, relative to the root of the project, not to 'sourcedir'
	Target string `yaml:"target"`
}

// Devserver specific parameters.
type Devserver struct {
	// The address that the development server will listen to
	ListenAddress string `yaml:"listenAddress"`
}

// Templates configures the location of Go templates used for postprocessing of files.
type Templates struct {
	Dir   string `yaml:"dir"`
	Elems []any  `yaml:"elems"`
}

const defaultConfigFile = "buildfront.yaml"

var defaultConfig = Config{
	Environment:         "development",
	Sourcedir:           "front/src",
	Targetdir:           "docs",
	CleanTarget:         true,
	HtmlFiles:           []string{"index.html"},
	EntryPoints:         []string{"app.js"},
	PageDir:             "/pages",
	StaticAssets:        StaticAssets{Source: "front/src/public", Target: "www"},
	HashEntrypointNames: false,
	Subdomainprefix:     "",
	Devserver:           Devserver{ListenAddress: ":3500"},
	Dependencies:        []string{},
	Templates:           Templates{},
	Components:          "/components",
	Public:              "/public",
}

// Validate checks the configuration for correctness and sets default values if necessary.
func (c *Config) Validate() error {
	if c.Environment == "" {
		c.Environment = defaultConfig.Environment
	}
	if c.Sourcedir == "" {
		c.Sourcedir = defaultConfig.Sourcedir
	}
	if c.Targetdir == "" {
		c.Targetdir = defaultConfig.Targetdir
	}
	if len(c.HtmlFiles) == 0 {
		c.HtmlFiles = defaultConfig.HtmlFiles
	}
	if len(c.EntryPoints) == 0 {
		c.EntryPoints = defaultConfig.EntryPoints
	}
	if c.PageDir == "" {
		c.PageDir = defaultConfig.PageDir
	}
	if c.StaticAssets.Source == "" {
		c.StaticAssets.Source = defaultConfig.StaticAssets.Source
	}
	if c.StaticAssets.Target == "" {
		c.StaticAssets.Target = defaultConfig.StaticAssets.Target
	}
	if c.Devserver.ListenAddress == "" {
		c.Devserver.ListenAddress = defaultConfig.Devserver.ListenAddress
	}
	if c.Components == "" {
		c.Components = defaultConfig.Components
	}
	if c.Public == "" {
		c.Public = defaultConfig.Public
	}
	return nil
}

// LoadConfig loads the configuration from the specified YAML file.
func LoadConfig(configFile string) (*Config, error) {
	if configFile == "" {
		configFile = defaultConfigFile
	}

	src, err := os.ReadFile(configFile)
	if err != nil {
		fmt.Printf("Error reading config file: %s\n", err)
		return nil, err
	}

	config := &Config{}

	err = yaml.Unmarshal(src, config)
	if err != nil {
		return nil, fmt.Errorf("unmarshalling config data: %w", err)
	}

	err = config.Validate()
	if err != nil {
		return nil, err
	}

	return config, nil

}
