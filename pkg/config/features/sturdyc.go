package features

import (
	"time"

	"github.com/nexentra/midgard/pkg/utils/constants"
)

type SturdycConfig struct {
	Capacity           int           `mapstructure:"STURDYC_CAPACITY"`
	ShardNumbers       int           `mapstructure:"STURDYC_SHARD_NUMBERS"`
	EvictionPercentage int           `mapstructure:"STURDYC_EVICTION_PERCENTAGE"`
	Ttl                time.Duration `mapstructure:"STURDYC_TTL"`
}

var sturdyc = &Feature{
	Name:       constants.FEATURE_STURDYC,
	Config:     &SturdycConfig{},
	enabled:    true,
	configured: false,
	ready:      false,
	requirements: []string{
		"Capacity",
		"ShardNumbers",
		"EvictionPercentage",
	},
}

func init() {
	Features.Add(sturdyc)
}
