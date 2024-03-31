package controllers

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/nexentra/midgard/api/middlewares"
	frontend "github.com/nexentra/midgard/client"
)

func (s *Server) initializeRoutes() {
	e := s.Echo

	prod := os.Getenv("PRODUCTION")

	if prod == "true" {
		e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
			Filesystem: frontend.BuildHTTPFS(),
			HTML5:      true,
		}))
	}

	// Login Route
	e.Add(echo.POST, "/api/login", s.Login, middlewares.SetMiddlewareJSON)

	//Users routes
	e.Add(echo.POST, "/api/users", s.CreateUser, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/users/:id", s.GetUser, middlewares.SetMiddlewareJSON)
	e.Add(echo.PUT, "/api/users/:id", s.UpdateUser, middlewares.SetMiddlewareJSON)
	e.Add(echo.DELETE, "/api/users/:id", s.DeleteUser, middlewares.SetMiddlewareJSON)

	//CustomSchemas routes
	e.Add(echo.POST, "/api/customschemas", s.CreateCustomSchema, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/mycustomschemas", s.GetMyCustomSchemas, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/customschemas/:id", s.GetCustomSchema, middlewares.SetMiddlewareJSON)
	//public route start
	e.Add(echo.GET, "/api/:key/mycustomschemas", s.GoGetAllCustomSchemas, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/:key/mycustomschemas/:id", s.GoGetOneCustomSchemas, middlewares.SetMiddlewareJSON)
	//public route end
	e.Add(echo.PUT, "/api/customschemas/:id", s.UpdateCustomSchema, middlewares.SetMiddlewareJSON)
	e.Add(echo.DELETE, "/api/customschemas/:id", s.DeleteCustomSchema, middlewares.SetMiddlewareJSON)

	//CustomDatas routes
	e.Add(echo.POST, "/api/customdatas/:id", s.CreateCustomData, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/customdatas/:id/:key", s.GetCustomData, middlewares.SetMiddlewareJSON)
	e.Add(echo.PUT, "/api/customdatas/:id/:key", s.UpdateCustomData, middlewares.SetMiddlewareJSON)
	e.Add(echo.DELETE, "/api/customdatas/:id/:key", s.DeleteCustomData, middlewares.SetMiddlewareJSON)

	//routes for admin
	e.Add(echo.GET, "/api/users", s.GetUsers, middlewares.SetMiddlewareJSON)
	e.Add(echo.GET, "/api/customschemas", s.GetCustomSchema, middlewares.SetMiddlewareJSON)
}
