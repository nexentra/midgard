package handlers_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	openapi "github.com/alexferl/echo-openapi"
	"github.com/stretchr/testify/assert"

	"github.com/nexentra/midgard/handlers"
	_ "github.com/nexentra/midgard/testing"
)

func TestHandler_Root(t *testing.T) {
	h := handlers.NewRootHandler(openapi.NewHandler())
	userSvc := handlers.NewMockUserService(t)
	patSvc := handlers.NewMockPersonalAccessTokenService(t)
	s := getServer(userSvc, patSvc, h)

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	resp := httptest.NewRecorder()

	s.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "Welcome")
}
