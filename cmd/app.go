package cmd

import (
	"log"

	client "github.com/nexentra/midgard/client"

	wailsapp "github.com/nexentra/midgard/pkg/app/init"
	"github.com/wailsapp/wails/v2"
	wailsLogger "github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"

	"github.com/spf13/cobra"
)

var appCmd = &cobra.Command{
	Use:   "app <option>",
	Short: "App service",
	Long: `Start desktop app.

When running this command without options, it will start the desktop app in devmode.`,

	Run: execAppCmd,
}

func init() {
	rootCmd.AddCommand(appCmd)
}

func execAppCmd(cmd *cobra.Command, args []string) {
	app := wailsapp.NewApp()

	err := wails.Run(&options.App{
		Title:             "Midgard",
		Width:             1024,
		Height:            768,
		MinWidth:          1024,
		MinHeight:         768,
		MaxWidth:          1280,
		MaxHeight:         800,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		Assets:            client.BuildSystemFS(),
		Menu:              nil,
		Logger:            nil,
		LogLevel:          wailsLogger.DEBUG,
		OnStartup:         app.Startup,
		OnDomReady:        app.DomReady,
		OnBeforeClose:     app.BeforeClose,
		OnShutdown:        app.Shutdown,
		WindowStartState:  options.Normal,
		Bind: []interface{}{
			app,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
			// DisableFramelessWindowDecorations: false,
			WebviewUserDataPath: "",
		},
		// Mac platform specific options
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "Midgard",
				Message: "",
				Icon:    client.Icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}
}
