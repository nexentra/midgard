package routers

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/labstack/echo/v4/middleware"
	"github.com/nexentra/midgard/client"
	catsHandlers "github.com/nexentra/midgard/pkg/api/handlers/cats"
	"github.com/nexentra/midgard/pkg/api/handlers/errors"
	healthHandlers "github.com/nexentra/midgard/pkg/api/handlers/healthz"
	usersHandlers "github.com/nexentra/midgard/pkg/api/handlers/users"
	"github.com/nexentra/midgard/pkg/api/middlewares"
	clerkClient "github.com/nexentra/midgard/pkg/clients/clerk"
	"github.com/nexentra/midgard/pkg/clients/logger"
	"github.com/nexentra/midgard/pkg/config"
	"github.com/nexentra/midgard/pkg/utils/constants"
)

var primaryApiRouter *Router

func InitPrimaryAPIRouter() {
	logger.Debug("Initializing primary api router ...")
	primaryApiRouter = &Router{}
	primaryApiRouter.Name = "primary API"
	primaryApiRouter.Init()

	// order is important here
	// first register development middlewares
	if config.DevModeFlag {
		logger.Debug("Registering primary api development middlewares ...")
		registerPrimaryApiDevModeMiddleware()
	}

	// next register middlwares
	logger.Debug("Registering primary api middlewares ...")
	registerPrimaryAPIMiddlewares()

	// next register all health check routes
	logger.Debug("Registering primary api health routes ...")
	registerPrimaryApiHealthCheckHandlers()

	// next register security related middleware
	logger.Debug("Registering primary api security middlewares ...")
	registerPrimaryApiSecurityMiddlewares()

	// next register all routes
	logger.Debug("Registering primary api primary routes ...")
	registerPrimaryAPIRoutes()

	// finally register default fallback error handlers
	// 404 is handled here as the last route
	logger.Debug("Registering primary api error handlers ...")
	registerPrimaryApiErrorHandlers()

	logger.Debug("Primary api registration complete.")
}

func PrimaryAPIRouter() *Router {
	return primaryApiRouter
}

func registerPrimaryAPIMiddlewares() {
	primaryApiRouter.RegisterPreMiddleware(middlewares.SlashesMiddleware())

	primaryApiRouter.RegisterMiddleware(middlewares.LoggerMiddleware())
	primaryApiRouter.RegisterMiddleware(middlewares.TimeoutMiddleware())
	primaryApiRouter.RegisterMiddleware(middlewares.RequestHeadersMiddleware())
	primaryApiRouter.RegisterMiddleware(middlewares.ResponseHeadersMiddleware())

	primaryApiRouter.Echo.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Filesystem: frontend.BuildHTTPFS(),
		HTML5:      true,
	}))

	if config.Feature(constants.FEATURE_GZIP).IsEnabled() {
		primaryApiRouter.RegisterMiddleware(middlewares.GzipMiddleware())
	}
}

func registerPrimaryApiDevModeMiddleware() {
	primaryApiRouter.RegisterMiddleware(middlewares.BodyDumpMiddleware())
}

func registerPrimaryApiSecurityMiddlewares() {
	primaryApiRouter.RegisterMiddleware(middlewares.XSSCheckMiddleware())

	if config.Feature(constants.FEATURE_CLERK).IsEnabled() {
		clerkCli := clerkClient.GetClient()
		clerkConfig := clerkCli.GetConfig()
		clerk.SetKey(clerkConfig.SecretKey)
	}

	if config.Feature(constants.FEATURE_CORS).IsEnabled() {
		primaryApiRouter.RegisterMiddleware(middlewares.CORSMiddleware())
	}

	if config.Feature(constants.FEATURE_ORY_KRATOS).IsEnabled() {
		primaryApiRouter.RegisterMiddleware(middlewares.AuthenticationMiddleware())
	}

	if config.Feature(constants.FEATURE_ORY_KETO).IsEnabled() {
		// keto middleware <- this will check if the user has the right permissions like system admin
		primaryApiRouter.RegisterMiddleware(middlewares.AuthenticationMiddleware())
	}
}

func registerPrimaryApiErrorHandlers() {
	primaryApiRouter.Echo.HTTPErrorHandler = errors.AutomatedHttpErrorHandler()
	primaryApiRouter.Echo.RouteNotFound("/*", errors.NotFound)
}

func registerPrimaryApiHealthCheckHandlers() {
	health := primaryApiRouter.Echo.Group("/primary-health")
	health.GET("/alive", healthHandlers.Index)
	health.GET("/ready", healthHandlers.Ready)
}

func registerPrimaryAPIRoutes() {
	primaryApiRouter.Echo.Group("/primary")
	cats := primaryApiRouter.Echo.Group("/primary-cats")
	cats.GET("", catsHandlers.Index)
	cats.GET("/:id", catsHandlers.Get)
	cats.POST("", catsHandlers.Post)
	cats.PUT("/:id", catsHandlers.Put)
	cats.DELETE("/:id", catsHandlers.Delete)

	users := primaryApiRouter.Echo.Group("/users")
	users.GET("", usersHandlers.Index)
	users.GET("/:id", usersHandlers.Get)
	users.POST("", usersHandlers.Post)
	// users.PUT("/:id", usersHandlers.Put)
	users.DELETE("/:id", usersHandlers.Delete)

	// add more routes here ...
}
