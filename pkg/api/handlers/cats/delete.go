package cats

import (
	"net/http"

	"github.com/nexentra/midgard/pkg/api/handlers"
	"github.com/nexentra/midgard/pkg/api/helpers"
	"github.com/nexentra/midgard/pkg/db/models"
	"github.com/nexentra/midgard/pkg/utils/constants"

	"github.com/labstack/echo/v4"
)

func Delete(c echo.Context) error {

	id := c.Param("id")

	if id == "" {
		return helpers.Error(c, constants.ERROR_ID_NOT_FOUND, nil)
	}

	if err := models.CatModel().Delete(id); err != nil {
		return helpers.Error(c, err, nil)
	}

	return c.JSON(http.StatusAccepted, handlers.Deleted())

}
