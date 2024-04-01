package info

import (
	"github.com/nexentra/midgard/pkg/config"

	"github.com/spf13/cobra"
)

// FeaturesCmd represents the features command
var FeaturesCmd = &cobra.Command{
	Use:   "features",
	Short: "Print service features configuration",
	Long:  `Print service features configuration based on environment`,
	Run:   execFeaturesCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execFeaturesCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	config.Env.PrintServiceFeatures()
}
