package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/utils/formaterror"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func (server *Server) CreateCustomData(c echo.Context) error {
	pid := uuid.MustParse(c.Param("id"))
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchema := models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", pid).Take(&customSchema).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, errors.New("customSchema not found"))
	}

	if uid != customSchema.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchemaUpdate := customSchema
	json_map := make(map[string]interface{})
	result := make(map[string]interface{})
	err = json.NewDecoder(c.Request().Body).Decode(&json_map)
	if err != nil {
		return err
	} else {
		for k, v := range json_map {
			if contains(customSchemaUpdate.FieldNames, k) {
				result[k] = v
			} else {
				return echo.NewHTTPError(http.StatusUnprocessableEntity, errors.New("Invalid field name"))
			}
		}
	}

	var data []map[string]interface{}

	err = customSchemaUpdate.Data.AssignTo(&data)
	if err != nil {
		return err
	}

	result["id"] = uuid.New().String()

	data = append(data, result)

	err = customSchemaUpdate.Data.Set(data)
	if err != nil {
		return err
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


func (server *Server) GetCustomData(c echo.Context) error {
	cid := uuid.MustParse(c.Param("id"))
	did := uuid.MustParse(c.Param("key"))
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchema := models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", cid).Take(&customSchema).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, errors.New("customSchema not found"))
	}

	if uid != customSchema.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	var data []map[string]interface{}

	err = customSchema.Data.AssignTo(&data)
	if err != nil {
		return err
	}

	for _, v := range data {
		if v["id"] == did.String() {
			return c.JSON(http.StatusOK, v)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, errors.New("customData not found"))
}