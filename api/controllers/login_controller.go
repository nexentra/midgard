package controllers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/responses"
	"github.com/KnockOutEZ/rest-api-portfolio/api/utils/formaterror"
	"golang.org/x/crypto/bcrypt"
)

func (server *Server) Login(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	user := models.User{}
	err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user.Prepare()
	err = user.Validate("login")
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	tokenstring, userID, err := server.SignIn(user.Email, user.Password)

	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusUnprocessableEntity, formattedError)
		return
	}
	type logindetails struct {
		Token  string `json:"token"`
		UserId uint32 `json:"id"`
	}

	loginDet := logindetails{tokenstring, userID}
	responses.JSON(w, http.StatusOK, loginDet)
}

func (server *Server) SignIn(email, password string) (string, uint32, error) {

	var err error

	user := models.User{}

	err = server.DB.Debug().Model(models.User{}).Where("email = ?", email).Take(&user).Error
	if err != nil {
		return "", 0, err
	}
	err = models.VerifyPassword(user.Password, password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", 0, err
	}

	log.Println(user)
	token, Error := auth.CreateToken(user.ID)
	userID := user.ID
	return token, userID, Error
	// return "", 0, err
}
