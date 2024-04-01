package routers

import (
	catsHandlers "github.com/nexentra/midgard/pkg/api/handlers/cats"
	"github.com/nexentra/midgard/pkg/api/handlers/errors"
	healthHandlers "github.com/nexentra/midgard/pkg/api/handlers/healthz"
	"github.com/nexentra/midgard/pkg/api/middlewares"
	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/utils/constants"
	"github.com/swaggo/echo-swagger"
	_ "github.com/nexentra/midgard/docs"
)

var publicApiRouter *Router

func InitPublicAPIRouter() {
	logger.Debug("Initializing public api router ...")
	publicApiRouter = &Router{}
	publicApiRouter.Name = "public API"
	publicApiRouter.Init()

	// order is important here
	// first register development middlewares
	if config.DevModeFlag {
		logger.Debug("Registering public api development middlewares ...")
		registerPublicApiDevModeMiddleware()
	}

	// next register middlwares
	logger.Debug("Registering public api middlewares ...")
	registerPublicAPIMiddlewares()

	// next register all health check routes
	logger.Debug("Registering public api health routes ...")
	registerPublicApiHealthCheckHandlers()

	// next register security related middleware
	logger.Debug("Registering public api security middlewares ...")
	registerPublicApiSecurityMiddlewares()

	// next register all routes
	logger.Debug("Registering public api public routes ...")
	registerPublicAPIRoutes()

	// finally register default fallback error handlers
	// 404 is handled here as the last route
	logger.Debug("Registering public api error handlers ...")
	registerPublicApiErrorHandlers()

	logger.Debug("Public api registration complete.")
}

func PublicAPIRouter() *Router {
	return publicApiRouter
}

func registerPublicAPIMiddlewares() {
	publicApiRouter.RegisterPreMiddleware(middlewares.SlashesMiddleware())

	publicApiRouter.RegisterMiddleware(middlewares.LoggerMiddleware())
	publicApiRouter.RegisterMiddleware(middlewares.TimeoutMiddleware())
	publicApiRouter.RegisterMiddleware(middlewares.RequestHeadersMiddleware())
	publicApiRouter.RegisterMiddleware(middlewares.ResponseHeadersMiddleware())

	if config.Feature(constants.FEATURE_GZIP).IsEnabled() {
		publicApiRouter.RegisterMiddleware(middlewares.GzipMiddleware())
	}
}

func registerPublicApiDevModeMiddleware() {
	publicApiRouter.RegisterMiddleware(middlewares.BodyDumpMiddleware())
}

func registerPublicApiSecurityMiddlewares() {
	publicApiRouter.RegisterMiddleware(middlewares.XSSCheckMiddleware())

	if config.Feature(constants.FEATURE_CORS).IsEnabled() {
		publicApiRouter.RegisterMiddleware(middlewares.CORSMiddleware())
	}

}

func registerPublicApiErrorHandlers() {
	publicApiRouter.Echo.HTTPErrorHandler = errors.AutomatedHttpErrorHandler()
	publicApiRouter.Echo.RouteNotFound("/*", errors.NotFound)
}

func registerPublicApiHealthCheckHandlers() {
	health := publicApiRouter.Echo.Group("/health")
	health.GET("/alive", healthHandlers.Index)
	health.GET("/ready", healthHandlers.Ready)
}

func registerPublicAPIRoutes() {
	publicApiRouter.Echo.GET("/swagger/*", echoSwagger.WrapHandler)
	cats := publicApiRouter.Echo.Group("/cats")
	cats.GET("", catsHandlers.Index)
	cats.GET("/:id", catsHandlers.Get)
	cats.POST("", catsHandlers.Post)
	cats.PUT("/:id", catsHandlers.Put)
	cats.DELETE("/:id", catsHandlers.Delete)
	// add more routes here ...
}
