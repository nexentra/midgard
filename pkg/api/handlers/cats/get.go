package cats

import (
	"net/http"

	"github.com/nexentra/midgard/pkg/api/handlers"
	"github.com/nexentra/midgard/pkg/api/helpers"
	"github.com/nexentra/midgard/pkg/db/models"
	"github.com/nexentra/midgard/pkg/utils/constants"

	"github.com/labstack/echo/v4"
)

//	@Summary		Show a Cat
//	@Description	get cat by ID
//	@Tags			cats
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Cat ID"
//	@Success		200	{object}	models.Cat
//	@Failure		400	{object}	error
//	@Failure		404	{object}	error
//	@Failure		500	{object}	error
//	@Router			/cats/{id} [get]
func Get(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		return helpers.Error(c, constants.ERROR_ID_NOT_FOUND, nil)
	}

	m, err := models.CatModel().Find(id)

	if err != nil {
		return helpers.Error(c, err, nil)
	}

	return c.JSON(http.StatusOK, handlers.Success(m.MapToForm()))

}
