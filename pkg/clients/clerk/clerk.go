package clerk

import (
	"reflect"

	"github.com/nexentra/midgard/pkg/config/features"
)

type ClerkClient struct {
	name   string
	config features.ClerkConfig
}

func (c *ClerkClient) Name() string {
	return c.name
}

func (c *ClerkClient) Configure(v any) {
	c.config = v.(reflect.Value).Interface().(features.ClerkConfig)
}

func (c *ClerkClient) GetConfig() features.ClerkConfig {
	return c.config
}
