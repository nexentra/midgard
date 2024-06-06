package sturdyc

import (
	"fmt"
	"reflect"

	"github.com/creativecreature/sturdyc"
	"github.com/nexentra/midgard/pkg/config/features"
)

type SturdycClient struct {
	name   string
	IntClient *sturdyc.Client[int]
	config features.SturdycConfig
}

func (c *SturdycClient) Name() string {
	return c.name
}

func (c *SturdycClient) Configure(v any) {
	c.config = v.(reflect.Value).Interface().(features.SturdycConfig)
}

func (c *SturdycClient) GetConfig() features.SturdycConfig {
	return c.config
}

// create your sturdyc client here based on your usage
func (c *SturdycClient) CreateIntClient(){
	c.IntClient= sturdyc.New[int](c.config.Capacity, c.config.ShardNumbers, c.config.Ttl, c.config.EvictionPercentage)
	fmt.Println(c.IntClient)
}