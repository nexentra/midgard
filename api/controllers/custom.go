package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/responses"
	"github.com/KnockOutEZ/rest-api-portfolio/api/utils/formaterror"
	"github.com/gorilla/mux"
)

func (server *Server) CreateCustomSchema(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	customSchema := models.CustomSchema{}
	err = json.Unmarshal(body, &customSchema)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	customSchema.Prepare()
	err = customSchema.Validate()
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}
	if uid != customSchema.UserID {
		responses.ERROR(w, http.StatusUnauthorized, errors.New(http.StatusText(http.StatusUnauthorized)))
		return
	}
	fmt.Println(customSchema, "customSchema")
	customSchemaCreated, err := customSchema.SaveCustomSchema(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.URL.Path, customSchemaCreated.ID))
	responses.JSON(w, http.StatusCreated, customSchemaCreated)
}

func (server *Server) GoGetAllCustomSchemas(w http.ResponseWriter, r *http.Request) {
	key := mux.Vars(r)
	uid, err := strconv.ParseUint(key["key"], 10, 64)
	customSchema := models.CustomSchema{}
	customSchemas, err := customSchema.GoFindAllMyCustomSchemas(server.DB, uid)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemas)
}

func (server *Server) GoGetOneCustomSchemas(w http.ResponseWriter, r *http.Request) {

	key := mux.Vars(r)
	uid, err := strconv.ParseUint(key["key"], 10, 64)
	pid, err := strconv.ParseUint(key["id"], 10, 64)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	customSchema := models.CustomSchema{}

	customSchemaReceived, err := customSchema.GoFindCustomSchemaByID(server.DB, pid,uid)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemaReceived)
}

func (server *Server) GetCustomSchemas(w http.ResponseWriter, r *http.Request) {

	customSchema := models.CustomSchema{}

	customSchemas, err := customSchema.FindAllCustomSchemas(server.DB)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemas)
}

func (server *Server) GetMyCustomSchemas(w http.ResponseWriter, r *http.Request) {
	customSchema := models.CustomSchema{}
	uid, err := auth.ExtractTokenID(r)
	customSchemas, err := customSchema.FindAllMyCustomSchemas(server.DB, uid)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemas)
}



func (server *Server) GetCustomSchema(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	pid, ok := vars["id"]
	if !ok {
		responses.ERROR(w, http.StatusBadRequest, errors.New("Invalid ID"))
		return
	}
	customSchema := models.CustomSchema{}

	customSchemaReceived, err := customSchema.FindCustomSchemaByID(server.DB, pid)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemaReceived)
}

func (server *Server) UpdateCustomSchema(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	// Check if the customSchema id is valid
	pid, ok := vars["id"]
	if !ok {
		responses.ERROR(w, http.StatusBadRequest, errors.New("Invalid ID"))
		return
	}

	//CHeck if the auth token is valid and  get the user id from it
	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}

	// Check if the customSchema exist
	customSchema := models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", pid).Take(&customSchema).Error
	if err != nil {
		responses.ERROR(w, http.StatusNotFound, errors.New("customSchema not found"))
		return
	}

	// If a user attempt to update a customSchema not belonging to him
	if uid != customSchema.UserID {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}
	// Read the data customSchemaed
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	// Start processing the request data
	customSchemaUpdate := models.CustomSchema{}
	err = json.Unmarshal(body, &customSchemaUpdate)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	//Also check if the request user id is equal to the one gotten from token
	if uid != customSchemaUpdate.UserID {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}

	customSchemaUpdate.Prepare()
	err = customSchemaUpdate.Validate()
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	customSchemaUpdate.ID = customSchema.ID //this is important to tell the model the customSchema id to update, the other update field are set above

	customSchemaUpdated, err := customSchemaUpdate.UpdateACustomSchema(server.DB)

	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	responses.JSON(w, http.StatusOK, customSchemaUpdated)
}

func (server *Server) DeleteCustomSchema(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	// Is a valid customSchema id given to us?
	pid, ok := vars["id"]
	if !ok {
		responses.ERROR(w, http.StatusBadRequest, errors.New("Invalid ID"))
		return
	}


	// Is this user authenticated?
	uid, err := auth.ExtractTokenID(r)
	if err != nil {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}

	// Check if the customSchema exist
	customSchema := models.CustomSchema{}
	err = server.DB.Debug().Model(models.CustomSchema{}).Where("id = ?", pid).Take(&customSchema).Error
	if err != nil {
		responses.ERROR(w, http.StatusNotFound, errors.New("Unauthorized"))
		return
	}

	// Is the authenticated user, the owner of this customSchema?
	if uid != customSchema.UserID {
		responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
		return
	}
	_, err = customSchema.DeleteACustomSchema(server.DB, pid, uid)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
	w.Header().Set("Entity", fmt.Sprintf("%d", pid))
	responses.JSON(w, http.StatusNoContent, "")
}
