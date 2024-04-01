package middlewares

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func XSSCheckMiddleware() echo.MiddlewareFunc {
	return middleware.Secure()
}
