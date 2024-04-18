package middlewares

import (
	"github.com/nexentra/midgard/pkg/utils/constants"

	"fmt"

	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/labstack/echo/v4"
)

func AuthenticationMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// skip authentication for health check and swagger docs
			if c.Path() == constants.NAME_HEALTH_PATH || c.Path() == fmt.Sprintf("%s%s", constants.NAME_HEALTH_PATH, constants.NAME_HEALTH_READY_PATH) || c.Path() == constants.NAME_SWAGGER_PATH {
				return next(c)
			}
			// validate session
			sessionToken := c.Request().Header.Get("Authorization")
			if sessionToken == "" {
				c.Logger().Warn("Missing Authorization header")
				c.Logger().Error(constants.ERROR_SESSION_NOT_FOUND)
				return constants.ERROR_NOT_AUTHORIZED
			}
			sessionToken = sessionToken[7:]

			claims, err := jwt.Verify(c.Request().Context(), &jwt.VerifyParams{
				Token: sessionToken,
			})
			if err != nil {
				c.Logger().Warn(err)
				c.Logger().Error("Invalid session token")
				return constants.ERROR_NOT_AUTHORIZED
			}

			c.Logger().Debugf("Session verified for user: %s", claims.Subject)
			// set user id in context for later use
			c.Set("user_id", claims.Subject)
			return next(c)
		}
	}
}
