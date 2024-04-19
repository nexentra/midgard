package routers

import (
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/labstack/echo/v4"
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

	// next register static files
	primaryApiRouter.Echo.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Filesystem: frontend.BuildHTTPFS(),
		HTML5:      true,
	}))

	primaryApiRouter.Echo.File("/*", "client/build/404.html")

	// next register all api routes
	g := primaryApiRouter.Echo.Group("/api")

	// order is important here
	// first register development middlewares
	if config.DevModeFlag {
		logger.Debug("Registering primary api development middlewares ...")
		registerPrimaryApiDevModeMiddleware()
	}

	// next register security related middleware
	logger.Debug("Registering primary api security middlewares ...")
	registerPrimaryApiSecurityMiddlewares(g)

	// next register middlwares
	logger.Debug("Registering primary api middlewares ...")
	registerPrimaryAPIMiddlewares(g)

	// next register all health check routes
	logger.Debug("Registering primary api health routes ...")
	registerPrimaryApiHealthCheckHandlers(g)

	// next register all public routes
	logger.Debug("Registering primary api primary routes ...")
	registerPrimaryPublicAPIRoutes(g)

	// next register all private routes
	logger.Debug("Registering primary api primary routes ...")
	registerPrimaryPrivateAPIRoutes(g)

	// finally register default fallback error handlers
	// 404 is handled here as the last route
	logger.Debug("Registering primary api error handlers ...")
	registerPrimaryApiErrorHandlers(g)

	logger.Debug("Primary api registration complete.")
}

func PrimaryAPIRouter() *Router {
	return primaryApiRouter
}

func registerPrimaryAPIMiddlewares(g *echo.Group) {
	g.Use(middlewares.SlashesMiddleware())

	g.Use(middlewares.LoggerMiddleware())
	g.Use(middlewares.TimeoutMiddleware())
	g.Use(middlewares.RequestHeadersMiddleware())
	g.Use(middlewares.ResponseHeadersMiddleware())

	if config.Feature(constants.FEATURE_GZIP).IsEnabled() {
		g.Use(middlewares.GzipMiddleware())
	}
}

func registerPrimaryApiDevModeMiddleware() {
	primaryApiRouter.RegisterMiddleware(middlewares.BodyDumpMiddleware())
}

func registerPrimaryApiSecurityMiddlewares(g *echo.Group) {
	g.Use(middlewares.XSSCheckMiddleware())

	if config.Feature(constants.FEATURE_CORS).IsEnabled() {
		g.Use(middlewares.CORSMiddleware())
	}

	if config.Feature(constants.FEATURE_ORY_KRATOS).IsEnabled() {
		g.Use(middlewares.AuthenticationMiddleware())
	}

	if config.Feature(constants.FEATURE_ORY_KETO).IsEnabled() {
		// keto middleware <- this will check if the user has the right permissions like system admin
		g.Use(middlewares.AuthenticationMiddleware())
	}
}

func registerPrimaryApiErrorHandlers(g *echo.Group) {
	primaryApiRouter.Echo.HTTPErrorHandler = errors.AutomatedHttpErrorHandler()
	g.RouteNotFound("/*", errors.NotFound)
}

func registerPrimaryApiHealthCheckHandlers(g *echo.Group) {
	health := g.Group("/health")
	health.GET("/alive", healthHandlers.Index)
	health.GET("/ready", healthHandlers.Ready)
}

func registerPrimaryPrivateAPIRoutes(g *echo.Group) {
	privateRouteGroup := g.Group("/private")

	// next register security related middleware
	if config.Feature(constants.FEATURE_CLERK).IsEnabled() {
		clerkCli := clerkClient.GetClient()
		clerkConfig := clerkCli.GetConfig()
		clerk.SetKey(clerkConfig.SecretKey)
		privateRouteGroup.Use(middlewares.AuthenticationMiddleware())
	}

	users := privateRouteGroup.Group("/cats")
	users.GET("", usersHandlers.Index)
	users.GET("/:id", usersHandlers.Get)
	users.POST("", usersHandlers.Post)
	// users.PUT("/:id", usersHandlers.Put)
	users.DELETE("/:id", usersHandlers.Delete)
}

func registerPrimaryPublicAPIRoutes(g *echo.Group) {
	publicRouteGroup := g.Group("/public")
	cats := publicRouteGroup.Group("/cats")
	cats.GET("", catsHandlers.Index)
	cats.GET("/:id", catsHandlers.Get)
	cats.POST("", catsHandlers.Post)
	cats.PUT("/:id", catsHandlers.Put)
	cats.DELETE("/:id", catsHandlers.Delete)
}
