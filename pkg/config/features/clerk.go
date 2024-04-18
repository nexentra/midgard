package features

import "github.com/nexentra/midgard/pkg/utils/constants"

type ClerkConfig struct {
	PublishableKey string `mapstructure:"CLERK_PUBLISHABLE_KEY"`
	SecretKey      string `mapstructure:"CLERK_SECRET_KEY"`
}

var clerk = &Feature{
	Name:       constants.FEATURE_CLERK,
	Config:     &ClerkConfig{},
	enabled:    true,
	configured: false,
	ready:      false,
	requirements: []string{
		"PublishableKey",
		"SecretKey",
	},
}

func init() {
	Features.Add(clerk)
}
