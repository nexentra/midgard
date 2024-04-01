package service

import (
	"reflect"

	"github.com/nexentra/midgard/pkg/config/features"
)

type ServiceClient struct {
	name   string
	config features.ServiceConfig
}

func (c *ServiceClient) Name() string {
	return c.name
}

func (c *ServiceClient) Configure(v any) {
	c.config = v.(reflect.Value).Interface().(features.ServiceConfig)
}

func (c *ServiceClient) GetConfig() features.ServiceConfig {
	return c.config
}
