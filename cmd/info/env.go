package info

import (
	"github.com/nexentra/midgard/pkg/config"

	"github.com/spf13/cobra"
)

// EnvCmd represents the env command
var EnvCmd = &cobra.Command{
	Use:   "env",
	Short: "Print service env",
	Long:  `Print service env`,
	Run:   execEnvCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execEnvCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	config.Env.PrintEnvironment()
}
