package middlewares

// custom middleware template
//
// func XxxMiddleware() echo.MiddlewareFunc {
// 	return func(next echo.HandlerFunc) echo.HandlerFunc {
// 		return func(c echo.Context) error {
// 			if (xxx = xxx) {
// 				return c.JSON(http.StatusNotAcceptable, "message saying not acceptable")
// 			}
// 			return next(c)
// 		}
// 	}
// }
