package proc

import (
	"github.com/nexentra/midgard/pkg/api/routers"
	"github.com/nexentra/midgard/pkg/clients/service"
)

func StartPrimaryApi() {
	serviceCli := service.GetClient()
	config := serviceCli.GetConfig()
	routers.InitPrimaryAPIRouter()
	routers.PrimaryAPIRouter().Start(config.Host, config.PrimaryApiPort)
}
