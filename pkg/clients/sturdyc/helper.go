package sturdyc

import (
	"github.com/nexentra/midgard/pkg/utils/constants"
)

var client *SturdycClient


func init() {
	client = &SturdycClient{
		name: constants.FEATURE_STURDYC,
	}
}

func GetClient() *SturdycClient {
	return client
}
