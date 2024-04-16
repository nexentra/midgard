package start

import (
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// PrimaryApiCmd represents the primaryApi command
var PrimaryApiCmd = &cobra.Command{
	Use:   "primaryApi",
	Short: "Start primary API service",
	Long:  `Start primary API web server.`,
	Run:   execPrimaryApiCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execPrimaryApiCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	if config.StartWatcherFlag {
		go WatcherCmd.Run(cmd, args)
	}
	proc.StartPrimaryApi()
}
