package controllers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/utils/formaterror"
	"github.com/labstack/echo/v4"
	"github.com/google/uuid"

)

func (server *Server) CreateUser(c echo.Context) error {
	user := models.User{}
	if err := c.Bind(&user); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}

	user.Prepare()
	err := user.Validate("")
	if err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	userCreated, err := user.SaveUser(server.DB)

	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError, formattedError)
	}

	token, err := auth.CreateToken(userCreated.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	loginDet := logindetails{token, userCreated.ID}

	c.Response().Header().Set("Location", fmt.Sprintf("%s%s/%d", c.Request().Host, c.Request().RequestURI, userCreated.ID))
	return c.JSON(http.StatusCreated, loginDet)
}

func (server *Server) GetUsers(c echo.Context) error {
	user := models.User{}

	users, err := user.FindAllUsers(server.DB)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, users)
}

func (server *Server) GetUser(c echo.Context) error {
	uid := uuid.MustParse(c.Param("id"))
	user := models.User{}
	userGotten, err := user.FindUserByID(server.DB, uid)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, userGotten)
}

func (server *Server) UpdateUser(c echo.Context) error {
	uid := uuid.MustParse(c.Param("id"))
	user := models.User{}
	if err := c.Bind(&user); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	tokenID, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}
	if tokenID != uid {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New(http.StatusText(http.StatusUnauthorized)))
	}
	user.Prepare()
	err = user.Validate("update")
	if err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
	}
	updatedUser, err := user.UpdateAUser(server.DB, uid)
	fmt.Println(updatedUser, err)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError, formattedError)
	}
	return c.JSON(http.StatusOK, updatedUser)
}

func (server *Server) DeleteUser(c echo.Context) error {
	uid := uuid.MustParse(c.Param("id"))
	tokenID, err := auth.ExtractTokenID(c.Request())
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New("Unauthorized"))
	}
	if tokenID != uid {
		return echo.NewHTTPError(http.StatusUnauthorized, errors.New(http.StatusText(http.StatusUnauthorized)))
	}
	user := models.User{}
	_, err = user.DeleteAUser(server.DB, uid)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	c.Response().Header().Set("Entity", fmt.Sprintf("%d", uid))
	return c.NoContent(http.StatusNoContent)
}
