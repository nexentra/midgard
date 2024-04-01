package cors

import (
	"reflect"

	"github.com/nexentra/midgard/pkg/config/features"
)

type CorsClient struct {
	name   string
	config features.CorsConfig
}

func (c *CorsClient) Name() string {
	return c.name
}

func (c *CorsClient) Configure(v any) {
	c.config = v.(reflect.Value).Interface().(features.CorsConfig)
}

func (c *CorsClient) GetConfig() features.CorsConfig {
	return c.config
}
