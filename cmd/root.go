package cmd

import (
	"os"
	"runtime/debug"
	"strings"

	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/proc"

	"github.com/spf13/cobra"
)

var Version string
var runtimeInfo, _ = debug.ReadBuildInfo()
var runtimeModuleInfo = strings.Split(runtimeInfo.Main.Path, "/")
var runtimeModuleName = runtimeModuleInfo[len(runtimeModuleInfo)-1]

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   runtimeModuleName,
	Short: runtimeModuleName + " cli",
	Long: `

	███╗   ███╗██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
	████╗ ████║██║██╔══██╗██╔════╝ ██╔══██╗██╔══██╗██╔══██╗
	██╔████╔██║██║██║  ██║██║  ███╗███████║██████╔╝██║  ██║
	██║╚██╔╝██║██║██║  ██║██║   ██║██╔══██║██╔══██╗██║  ██║
	██║ ╚═╝ ██║██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
	╚═╝     ╚═╝╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
														   
	
` + runtimeModuleName + ` cli`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {

	var cmdFound bool
	cmd := rootCmd.Commands()

	for _, a := range cmd {
		for _, b := range os.Args[1:] {
			if a.Name() == b {
				cmdFound = true
				break
			}
		}
	}
	if !cmdFound {
		args := append([]string{"app"}, os.Args[1:]...)
		rootCmd.SetArgs(args)
	}
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {

	// This is auto executed upon start
	// Initialization processes can go here ...

	// Configure cobra
	// rootCmd.CompletionOptions.DisableDefaultCmd = true

	// Set global flags
	rootCmd.PersistentFlags().BoolVarP(&config.DevModeFlag, "dev", "d", false, "Run in development mode")
	rootCmd.PersistentFlags().BoolVarP(&config.EnvModeFlag, "env", "e", false, "Print environment before execution")
	rootCmd.PersistentFlags().StringVarP(&config.LogLevelFlag, "log", "l", "", "Log Level")

	// Initialize app config
	cobra.OnInitialize(initEnv)

	// Register persistent function for all commands
	rootCmd.PersistentPreRun = func(cmd *cobra.Command, args []string) {
		execRootPersistentPreRun()
	}
}

func initEnv() {
	if config.DevModeFlag {
		logger.SetDevMode()
	}
	config.OverrideLoggerUsingFlags()
	proc.InitServiceEnv(runtimeModuleName, Version)
}

func execRootPersistentPreRun() {
	logger.Debug("Executing root cmd persistent pre run ...")

	// You can initialize other features here ...
	// this will run before any command, make sure to put only global initializations here
	// to avoid running into nil pointers or undefined variables
	// ...

}