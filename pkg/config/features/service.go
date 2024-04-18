package features

import (
	"github.com/nexentra/midgard/pkg/utils/constants"
)

type ServiceConfig struct {
	Host                   string   `mapstructure:"HOST"`
	PrimaryApiPort         string   `mapstructure:"PRIMARY_API_PORT"`
	ProtectedApiPort       string   `mapstructure:"PROTECTED_API_PORT"`
	PublicApiPort          string   `mapstructure:"PUBLIC_API_PORT"`
	HiddenApiPort          string   `mapstructure:"HIDDEN_API_PORT"`
	LogLevel               string   `mapstructure:"LOG_LEVEL"`
	RequestTimeoutDuration string   `mapstructure:"REQUEST_TIMEOUT_DURATION"`
	WatcherSleepInterval   string   `mapstructure:"WATCHER_SLEEP_INTERVAL"`
	DisableFeatures        []string `mapstructure:"DISABLE_FEATURES"`
}

var service = &Feature{
	Name:       constants.FEATURE_SERVICE,
	Config:     &ServiceConfig{},
	enabled:    true,
	configured: false,
	ready:      false,
	requirements: []string{
		"Host",
		"PrimaryApiPort",
		"ProtectedApiPort",
		"PublicApiPort",
		"HiddenApiPort",
		"LogLevel",
		"RequestTimeoutDuration",
		"WatcherSleepInterval",
		"DisableFeatures",
	},
}

func init() {
	Features.Add(service)
}
