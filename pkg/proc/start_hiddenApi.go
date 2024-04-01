package proc

import (
	"github.com/nexentra/midgard/pkg/api/routers"
	"github.com/nexentra/midgard/pkg/clients/service"
)

func StartHiddenApi() {
	serviceCli := service.GetClient()
	config := serviceCli.GetConfig()
	routers.InitHiddenAPIRouter()
	routers.HiddenAPIRouter().Start(config.Host, config.HiddenApiPort)
}
