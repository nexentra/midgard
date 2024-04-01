package gzip

import (
	"reflect"

	"github.com/nexentra/midgard/pkg/config/features"
)

type GzipClient struct {
	name   string
	config features.GzipConfig
}

func (c *GzipClient) Name() string {
	return c.name
}

func (c *GzipClient) Configure(v any) {
	c.config = v.(reflect.Value).Interface().(features.GzipConfig)
}

func (c *GzipClient) GetConfig() features.GzipConfig {
	return c.config
}
