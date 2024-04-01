package start

import (
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// PublicApiCmd represents the publicApi command
var PublicApiCmd = &cobra.Command{
	Use:   "publicApi",
	Short: "Start public API service",
	Long:  `Start public API web server.`,
	Run:   execPublicApiCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execPublicApiCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	if config.StartWatcherFlag {
		go WatcherCmd.Run(cmd, args)
	}
	proc.StartPublicApi()
}
