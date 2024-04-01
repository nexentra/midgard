package proc

import (
	"github.com/nexentra/midgard/pkg/api/routers"
	"github.com/nexentra/midgard/pkg/clients/service"
)

func StartPublicApi() {
	serviceCli := service.GetClient()
	config := serviceCli.GetConfig()
	routers.InitPublicAPIRouter()
	routers.PublicAPIRouter().Start(config.Host, config.PublicApiPort)
}
