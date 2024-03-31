package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/nexentra/midgard/api/auth"
	"github.com/nexentra/midgard/api/models"
	"github.com/nexentra/midgard/api/utils/formaterror"
)

func (server *Server) CreateCustomSchema(c echo.Context) error {
	customSchema := models.CustomSchema{}
	if err := c.Bind(&customSchema); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	fmt.Println(customSchema.UserID, "customSchema")

	customSchema.Prepare()
	err := customSchema.Validate()
	if err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}
	if uid != customSchema.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New(http.StatusText(http.StatusUnauthorized)))
	}
	fmt.Println(customSchema, "customSchema")
	customSchemaCreated, err := customSchema.SaveCustomSchema(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError, formattedError)
	}

	err = server.KVDB.Delete([]byte(uid.String()))
	if err != nil {
		fmt.Println("error from kvdb:" + string(err.Error()))
	}

	c.Response().Header().Set("Location", fmt.Sprintf("%s%s/%d", c.Request().Host, c.Request().RequestURI, customSchemaCreated.ID))
	return c.JSON(http.StatusCreated, customSchemaCreated)
}

func (server *Server) GoGetAllCustomSchemas(c echo.Context) error {
	uid := uuid.MustParse(c.Param("key"))
	customSchema := models.CustomSchema{}
	var customSchemasResponse *[]models.CustomSchemaResponse
	fmt.Println(uid, "uid")
	fmt.Println("----------------------------------")

	val, err := server.KVDB.Get([]byte(uid.String()))
	if err != nil {
		fmt.Println("error from kvdb:" + string(err.Error()))
	}

	if val == nil {
		customSchemasResponse, err = customSchema.GoFindAllMyCustomSchemas(server.DB, uid)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		res, err := json.Marshal(customSchemasResponse)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		err = server.KVDB.PutWithTTL([]byte(uid.String()), []byte(res), time.Hour*24*3)
		if err != nil {
			fmt.Println("error from kvdb:" + string(err.Error()))
		}
		fmt.Println("from db")
	} else {
		err = json.Unmarshal(val, &customSchemasResponse)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		fmt.Println("from kvdb")
	}
	return c.JSON(http.StatusOK, customSchemasResponse)
}

func (server *Server) GoGetOneCustomSchemas(c echo.Context) error {
	uid := uuid.MustParse(c.Param("key"))
	pid := uuid.MustParse(c.Param("id"))
	customSchema := models.CustomSchema{}

	customSchemaReceived, err := customSchema.GoFindCustomSchemaByID(server.DB, pid, uid)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, customSchemaReceived)
}

func (server *Server) GetCustomSchemas(c echo.Context) error {
	customSchema := models.CustomSchema{}

	customSchemas, err := customSchema.FindAllCustomSchemas(server.DB)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, customSchemas)
}

func (server *Server) GetMyCustomSchemas(c echo.Context) error {
	customSchema := models.CustomSchema{}
	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	fmt.Println(uid, "uid")

	var customSchemas *[]models.CustomSchema

	val, err := server.KVDB.Get([]byte(uid.String()))
	if err != nil {
		fmt.Println("error from kvdb:" + string(err.Error()))
	}

	if val == nil {
		customSchemas, err = customSchema.FindAllMyCustomSchemas(server.DB, uid)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		res, err := json.Marshal(customSchemas)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		err = server.KVDB.PutWithTTL([]byte(uid.String()), []byte(res), time.Hour*24*3)
		if err != nil {
			fmt.Println("error from kvdb:" + string(err.Error()))
		}
		fmt.Println("from db")
	} else {
		err = json.Unmarshal(val, &customSchemas)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
		fmt.Println("from kvdb")
	}

	return c.JSON(http.StatusOK, customSchemas)
}

func (server *Server) GetCustomSchema(c echo.Context) error {
	pid := uuid.MustParse(c.Param("id"))
	customSchema := models.CustomSchema{}

	customSchemaReceived, err := customSchema.FindCustomSchemaByID(server.DB, pid)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, customSchemaReceived)
}

func (server *Server) UpdateCustomSchema(c echo.Context) error {
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

	err = server.KVDB.Delete([]byte(uid.String()))
	if err != nil {
		fmt.Println("error from kvdb:" + string(err.Error()))
	}
	return c.JSON(http.StatusOK, customSchemaUpdated)
}

func (server *Server) DeleteCustomSchema(c echo.Context) error {
	pid := uuid.MustParse(c.Param("id"))

	uid, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}

	customSchema := models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", pid).Take(&customSchema).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, errors.New("Unauthorized"))
	}

	if uid != customSchema.UserID {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}
	_, err = customSchema.DeleteACustomSchema(server.DB, pid, uid)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	err = server.KVDB.Delete([]byte(uid.String()))
	if err != nil {
		fmt.Println("error from kvdb:" + string(err.Error()))
	}

	c.Response().Header().Set("Entity", fmt.Sprintf("%d", pid))
	return c.NoContent(http.StatusNoContent)
}
