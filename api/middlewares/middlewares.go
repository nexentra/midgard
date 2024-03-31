package middlewares

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/nexentra/midgard/api/auth"
)

func SetMiddlewareJSON(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set("Content-Type", "application/json")
		//start cors
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE")
		if c.Request().Method == "OPTIONS" {
			return nil
		}
		//till here
		return next(c)
	}
}

func SetMiddlewareAuthentication(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		err := auth.TokenValid(c.Request())
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
		}
		c.Response().Header().Set("Content-Type", "application/json")
		//start cors
		c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE")
		if c.Request().Method == "OPTIONS" {
			return nil
		}
		//till here
		return next(c)
	}
}
