package clerk

import "github.com/nexentra/midgard/pkg/utils/constants"

var client *ClerkClient

func init() {
	client = &ClerkClient{
		name: constants.FEATURE_CLERK,
	}
}

func GetClient() *ClerkClient {
	return client
}
