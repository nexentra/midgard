package handlers_test

import (
	api "github.com/alexferl/golib/http/api/server"

	"github.com/nexentra/midgard/handlers"
	"github.com/nexentra/midgard/models"
	"github.com/nexentra/midgard/server"
	_ "github.com/nexentra/midgard/testing"
)

func getUser() *models.User {
	user := models.NewUser("test@example.com", "test")
	user.Id = "1000"
	user.Create(user.Id)
	return user
}

func getAdmin() *models.User {
	admin := models.NewUserWithRole("admin@example.com", "admin", models.AdminRole)
	admin.Id = "2000"
	admin.Create(admin.Id)
	return admin
}

func getSuper() *models.User {
	super := models.NewUserWithRole("super@example.com", "super", models.SuperRole)
	super.Id = "3000"
	super.Create(super.Id)
	return super
}

func getServer(userSvc handlers.UserService, patSvc handlers.PersonalAccessTokenService, handler ...handlers.Handler) *api.Server {
	return server.NewTestServer(userSvc, patSvc, handler...)
}
