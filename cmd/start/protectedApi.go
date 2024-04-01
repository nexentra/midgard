package start

import (
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// ProtectedApiCmd represents the protectedApi command
var ProtectedApiCmd = &cobra.Command{
	Use:   "protectedApi",
	Short: "Start protected API service",
	Long:  `Start protected API web server.`,
	Run:   execProtectedApiCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execProtectedApiCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	if config.StartWatcherFlag {
		go WatcherCmd.Run(cmd, args)
	}
	proc.StartProtectedApi()
}
