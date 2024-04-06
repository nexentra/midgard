package app

import (
	client "github.com/nexentra/midgard/client"
	wailsapp "github.com/nexentra/midgard/pkg/app/init"
	"github.com/spf13/cobra"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

// WailsStart represents the protectedApi command
var WailsStart = &cobra.Command{
	Use:   "wails",
	Short: "Start wails service",
	Long:  `Start wails app servive.`,
	Run:   execWailsStart,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execWailsStart(cmd *cobra.Command, args []string) {
	app := wailsapp.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "midgard",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: client.BuildFs,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
