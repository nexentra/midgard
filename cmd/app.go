package cmd

import (
	"github.com/nexentra/midgard/cmd/app"
	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/config"

	"github.com/spf13/cobra"
)

// appCmd represents the start command
var appCmd = &cobra.Command{
	Use:   "app <option>",
	Short: "App service",
	Long: `Start app service.

When running this command without options, it will start open desktop app.
If you wish to add any options instead, you can choose from the 
available options.`,

	Run: execAppCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...

	// Register sub commands
	// appCmd.AddCommand(start.PublicApiCmd)
	// appCmd.AddCommand(start.ProtectedApiCmd)
	// appCmd.AddCommand(start.HiddenApiCmd)
	// appCmd.AddCommand(start.WatcherCmd)

	// Set global flags
	appCmd.PersistentFlags().BoolVar(&config.StartWatcherFlag, "watcher", false, "Start watcher daemon in background")
	appCmd.PersistentFlags().StringVarP(&config.HostFlag, "host", "H", "", "Service host")
	appCmd.PersistentFlags().StringVar(&config.ProtectedPortFlag, "protected-api-port", "", "Protected API Service port")
	appCmd.PersistentFlags().StringVar(&config.PublicPortFlag, "public-api-port", "", "Public API Service port")
	appCmd.PersistentFlags().StringVar(&config.HiddenPortFlag, "hidden-api-port", "", "Hidden API Service port")

	// Register persistent function for all sub commands
	appCmd.PersistentPreRun = func(cmd *cobra.Command, args []string) {
		rootCmd.PersistentPreRun(cmd, args)
		execAppPersistentPreRun()
	}

	// Register start command
	rootCmd.AddCommand(appCmd)
}

func execAppPersistentPreRun() {
	logger.Debug("Executing start persistent pre run ...")

	// You can initialize other features here ...
	// this will run before any command, make sure to put only global initializations here
	// to avoid running into nil pointers or undefined variables
	// ...
}

func execAppCmd(cmd *cobra.Command, args []string) {
	app.WailsStart.Run(cmd, args)
}
