package middlewares

import (
	"net/http"

	"github.com/nexentra/midgard/pkg/clients/cors"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func CORSMiddleware() echo.MiddlewareFunc {
	corsCli := cors.GetClient()
	config := corsCli.GetConfig()

	return middleware.CORSWithConfig(middleware.CORSConfig{
		// get allowed origins from env
		AllowOrigins:     []string{config.AllowOrigins},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodOptions, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Bearer", "Bearer ", "content-type", "authorization", "Origin", "Accept"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Content-Type", "Set-Cookie"},
		MaxAge:           0,
	})
}
