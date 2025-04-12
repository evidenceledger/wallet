package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/evidenceledger/wallet/faster"
	"github.com/hesusruiz/vcutils/yaml"
	"github.com/labstack/echo/v5"
	echomiddle "github.com/labstack/echo/v5/middleware"

	"log"
)

const (
	defaultConfigFile = "buildfront.yaml"
)

var (
	configFile = flag.String("config", LookupEnvOrString("CONFIG_FILE", defaultConfigFile), "path to configuration file")
	autobuild  = flag.Bool("auto", true, "Perform build on every request to the root path")
	meta       = flag.Bool("m", false, "Write the meta info to a file")
)

func main() {

	flag.Usage = func() {
		fmt.Printf("Usage of faster (v0.5)\n")
		fmt.Println("  faster build\tBuild the application")
		fmt.Println("  faster serve\tStart a development server that builds automatically when reloading")
		fmt.Println()
		fmt.Println("faster uses a configuration file named 'buildfront.yaml' located in the current directory.")
		fmt.Println()
		fmt.Println("The development server has the following flags:")
		flag.PrintDefaults()
	}

	// Parse the cli flags
	flag.Parse()
	argsCmd := flag.Args()

	// Prepare the arguments map
	args := map[string]bool{}
	for _, arg := range argsCmd {
		args[arg] = true
	}

	// Perform a standard build if no arguments specified
	if len(args) == 0 {
		args["build"] = true
	}

	// Load the configuration
	_, err := faster.LoadConfig(*configFile)
	if err != nil {
		panic(err)
	}

	// Perform a standard build
	if args["build"] {
		result, err := faster.BuildFront(*configFile)
		if err != nil {
			fmt.Println("Error building:", err.Error())
			os.Exit(1)
		}
		if *meta {
			processedResult := api.AnalyzeMetafile(result.Metafile, api.AnalyzeMetafileOptions{})
			err = os.WriteFile("meta.txt", []byte(processedResult), 0755)
			if err != nil {
				fmt.Println("Error writing the metas file", err.Error())
				os.Exit(1)
			}
			fmt.Println("Result written to meta.txt")
		}
		os.Exit(0)
	}

	// Watch and build
	if args["serve"] {
		StartServices(*configFile)
		os.Exit(0)
	}

}

func StartServices(configFileName string) error {
	cfg := readConfiguration(configFileName)

	// Start the server for static Wallet assets
	staticServer := echo.New()
	staticServer.Use(echomiddle.CORS())

	// Serve the static assets from the configured directory
	staticDir := cfg.String("targetdir", "www")
	staticServer.Static("/*", staticDir)

	// Start the watcher
	go faster.WatchAndBuild(configFileName)

	// Stop the whole server remotely
	staticServer.GET("/stopserver", func(c echo.Context) error {
		os.Exit(0)
		return nil
	})

	staticServer.GET("/fake", func(c echo.Context) error {
		fmt.Println("Me han llamado al GET: ", c.Request().URL)

		return nil
	})
	staticServer.POST("/fake", func(c echo.Context) error {
		fmt.Println("Me han llamado al POST")

		return nil
	})

	type forwardRequest struct {
		Method        string `json:"method"`
		URL           string `json:"url"`
		Mimetype      string `json:"mimetype"`
		Authorization string `json:"authorization"`
	}

	staticServer.POST("/serverhandler", func(c echo.Context) error {
		fmt.Println("ServerHandler called")

		received := new(forwardRequest)

		reqbody, err := io.ReadAll(c.Request().Body)
		if err != nil {
			fmt.Println("error reading body of request: ", err)
			return c.String(http.StatusBadRequest, "bad request")
		}
		fmt.Println("Body: ", string(reqbody))

		err = json.Unmarshal(reqbody, received)
		if err != nil {
			fmt.Println("error unmarshalling body into struct: ", err)
			return c.String(http.StatusBadRequest, "bad request")
		}

		// Forward the received request to the target server
		if received.Method == "GET" {
			fmt.Println("Received GET request to: ", received.URL)
			resp, err := http.Get(received.URL)
			if err != nil {
				fmt.Printf("error: %v\n", err)
				return c.String(http.StatusBadRequest, "bad request")
			}
			defer resp.Body.Close()
			fmt.Println("Response Status:", resp.Status)
			fmt.Println("Response Headers:", resp.Header)
			body, _ := io.ReadAll(resp.Body)
			fmt.Println("Response Body:", string(body))
			return c.String(resp.StatusCode, string(body))

		} else if received.Method == "POST" {
			fmt.Println("Received POST request to: ", received.URL)

			receivedBodyMap := make(map[string]any)
			err = json.Unmarshal(reqbody, &receivedBodyMap)
			if err != nil {
				fmt.Println("error unmarshalling body into struct: ", err)
				return c.String(http.StatusBadRequest, "bad request")
			}
			fmt.Printf("MapBody: %+v\n", receivedBodyMap)

			var req *http.Request
			switch receivedBodyMap["body"].(type) {
			case string:

				req, err = http.NewRequest("POST", received.URL, strings.NewReader(receivedBodyMap["body"].(string)))
				if err != nil {
					fmt.Printf("error: %v\n", err)
					return c.String(http.StatusBadRequest, "bad request")
				}

			default:

				bodyserialized, err := json.Marshal(receivedBodyMap["body"])
				if err != nil {
					fmt.Println("error marshalling body: ", err)
					return c.String(http.StatusBadRequest, "bad request")
				}

				req, err = http.NewRequest("POST", received.URL, bytes.NewReader(bodyserialized))
				if err != nil {
					fmt.Printf("error: %v\n", err)
					return c.String(http.StatusBadRequest, "bad request")
				}

			}

			req.Header.Set("Content-Type", received.Mimetype)
			if len(received.Authorization) > 0 {
				req.Header.Set("Authorization", "Bearer "+received.Authorization)
			}

			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				fmt.Printf("error sending request: %v\n", err)
				return c.String(http.StatusBadRequest, "bad request")
			}
			defer resp.Body.Close()
			fmt.Println("Response Status:", resp.Status)
			fmt.Println("Response Headers:", resp.Header)
			body, _ := io.ReadAll(resp.Body)
			fmt.Println("Response Body:", string(body))
			return c.String(resp.StatusCode, string(body))
		} else {
			fmt.Println("Received BAD request to: ", received.URL)
			return c.String(http.StatusBadRequest, "bad request")
		}

	})

	//Start serving requests
	walletListenAddress := ":3030"
	log.Fatal(staticServer.Start(walletListenAddress))

	return nil

}

// readConfiguration reads a YAML file and creates an easy-to navigate structure
func readConfiguration(configFile string) *yaml.YAML {
	var cfg *yaml.YAML
	var err error

	cfg, err = yaml.ParseYamlFile(configFile)
	if err != nil {
		fmt.Printf("Config file not found, exiting\n")
		panic(err)
	}
	return cfg
}

func LookupEnvOrString(key string, defaultVal string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defaultVal
}
