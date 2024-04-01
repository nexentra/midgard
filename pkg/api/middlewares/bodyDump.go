package middlewares

import (
	"github.com/nexentra/midgard/pkg/utils"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func BodyDumpMiddleware() echo.MiddlewareFunc {
	return middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
		if len(reqBody) > 0 {
			obj, err := utils.PrettyJSONString(string(reqBody))
			if err != nil {
				c.Logger().Error("Error unmarshalling request body: ", err)
				return
			}
			c.Logger().Debug("Request Body: ", obj)
		}
	})
}
