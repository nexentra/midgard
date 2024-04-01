package proc

import (
	"github.com/nexentra/midgard/pkg/api/routers"
	"github.com/nexentra/midgard/pkg/clients/service"
)

func StartProtectedApi() {
	serviceCli := service.GetClient()
	config := serviceCli.GetConfig()
	routers.InitProtectedAPIRouter()
	routers.ProtectedAPIRouter().Start(config.Host, config.ProtectedApiPort)
}
