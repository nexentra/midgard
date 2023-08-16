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
	// get schema
	pid := uuid.MustParse(c.Param("id"))
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	// customSchema := models.CustomSchema{}
	// if err := c.Bind(&customSchema); err != nil {
	// 	return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	// }

	// customSchemaReceived, err := customSchema.FindCustomSchemaByID(server.DB, pid)
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusInternalServerError, err)
	// }

	//modify it here

	// push the new changes to the db
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
		//json_map has the JSON Payload decoded into a map
		fmt.Println("json_map", json_map)
		for k, v := range json_map {
			fmt.Println("k:", k, "v:", v)
			if contains(customSchemaUpdate.FieldNames, k) {
				result[k] = v
			} else {
				return echo.NewHTTPError(http.StatusUnprocessableEntity, errors.New("Invalid field name"))
			}
		}
	}

	var data []any

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
