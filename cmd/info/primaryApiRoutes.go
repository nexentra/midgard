package info

import (
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// PrimaryApiRoutesCmd represents the primary-api-routes command
var PrimaryApiRoutesCmd = &cobra.Command{
	Use:   "primary-api-routes",
	Short: "Print primary API routes",
	Long:  `Print all primary API routes table`,
	Run:   execPrimaryApiRoutesCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execPrimaryApiRoutesCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	proc.PrintPrimaryRoutesTable()
}
