package proc

import (
	"fmt"

	"github.com/nexentra/midgard/pkg/clients/dbc"
	"github.com/nexentra/midgard/pkg/clients/logger"
)

func DBDrop() {
	logger.SetLogger(string(logger.DebugLvl))

	dbClient := dbc.GetDBClient()

	dbClient.InitServerConnection()

	if err := dbClient.DropDatabase(); err != nil {
		panic(fmt.Errorf("failed to drop database: %w", err))
	}

	// logger.Info("Database '" + config.Env.Config.DBName + "' dropped.")

}
