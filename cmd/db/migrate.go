package db

import (
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

// MigrateCmd represents the migrate command
var MigrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Migrate database",
	Long:  `Run database migrations.`,
	Run:   execMigrateCmd,
}

func init() {
	// This is auto executed upon start
	// Initialization processes can go here ...
}

func execMigrateCmd(cmd *cobra.Command, args []string) {
	// Command execution goes here ...
	proc.DBMigrate()
}
