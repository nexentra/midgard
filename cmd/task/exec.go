package task

import (
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// ExecCmd represents the exec command
var ExecCmd = &cobra.Command{
	Use:   "exec",
	Short: "Start exec task",
	Long:  `Start the exec task.`,
	Run:   execExecCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execExecCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	proc.TaskExec(args)
}
