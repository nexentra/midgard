package start

import (
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// WatcherCmd represents the watcher command
var WatcherCmd = &cobra.Command{
	Use:   "watcher",
	Short: "Start watcher daemon",
	Long:  `Start watcher daemon.`,
	Run:   execWatcherCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execWatcherCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	proc.StartWatcher()
}
