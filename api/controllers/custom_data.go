package controllers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/utils/formaterror"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func (server *Server) CreateCustomData(c echo.Context) error {
	// get schema
	pid := uuid.MustParse(c.Param("id"))
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchema := models.CustomSchema{}
	if err := c.Bind(&customSchema); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	customSchemaReceived, err := customSchema.FindCustomSchemaByID(server.DB, pid)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	fmt.Println(customSchemaReceived, "customSchemaReceived")

	//modify it here






	// push the new changes to the db
	customSchema = models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", pid).Take(&customSchema).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, errors.New("customSchema not found"))
	}

	if uid != customSchema.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchemaUpdate := models.CustomSchema{}
	if err := c.Bind(&customSchemaUpdate); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	if uid != customSchemaUpdate.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchemaUpdate.Prepare()
	err = customSchemaUpdate.Validate()
	if err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	customSchemaUpdate.ID = customSchema.ID

	customSchemaUpdated, err := customSchemaUpdate.UpdateACustomSchema(server.DB)

	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError, formattedError)
	}

	return c.JSON(http.StatusOK, customSchemaUpdated)
}
