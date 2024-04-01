package kratos

import "github.com/nexentra/midgard/pkg/utils/constants"

func init() {
	kratosClient = &Kratos{
		name:    constants.FEATURE_ORY_KRATOS,
		Session: &KratosSession{},
	}
}

func GetClient() *Kratos {
	return kratosClient
}

// var Cli *Kratos
// var Session *KratosSession
// var Config *KratosConfig

// func init() {
// 	Config = &KratosConfig{}
// }

// func InitKratos(devMode bool) {
// 	Cli = &Kratos{}
// 	Session = &KratosSession{}
// 	publicConfig := oryKratos.NewConfiguration()
// 	if devMode {
// 		publicConfig.Debug = true
// 	}
// 	publicConfig.Servers = []oryKratos.ServerConfiguration{
// 		{
// 			URL: Config.KratosPublicURL,
// 		},
// 	}
// 	Cli.Public = oryKratos.NewAPIClient(publicConfig)
// 	adminConfig := oryKratos.NewConfiguration()
// 	if devMode {
// 		adminConfig.Debug = true
// 	}
// 	adminConfig.Servers = []oryKratos.ServerConfiguration{
// 		{
// 			URL: Config.KratosAdminURL,
// 		},
// 	}
// 	Cli.admin = oryKratos.NewAPIClient(adminConfig)
// }

// func GetKratosInstance() *Kratos {
// 	return Cli
// }
