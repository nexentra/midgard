package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/rs/cors"

	_ "github.com/jinzhu/gorm/dialects/mysql"    //mysql database driver
	_ "github.com/jinzhu/gorm/dialects/postgres" //postgres database driver

	"github.com/KnockOutEZ/rest-api-portfolio/api/models"
	"github.com/KnockOutEZ/rest-api-portfolio/api/ui"
)

type Server struct {
	DB     *gorm.DB
	Router *mux.Router
}

func (server *Server) Initialize(Dbdriver, DbUser, DbPassword, DbPort, DbHost, DbName string) {

	var err error

	if Dbdriver == "mysql" {
		DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)
		server.DB, err = gorm.Open(Dbdriver, DBURL)
		if err != nil {
			fmt.Printf("Cannot connect to %s database", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database", Dbdriver)
		}
	}
	if Dbdriver == "postgres" {
		DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=require password=%s", DbHost, DbPort, DbUser, DbName, DbPassword)
		server.DB, err = gorm.Open(Dbdriver, DBURL)
		if err != nil {
			fmt.Printf("Cannot connect to %s database", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database", Dbdriver)
		}
	}

	server.DB.Debug().AutoMigrate(&models.User{}, &models.CustomSchema{}) //database migration

	server.Router = mux.NewRouter()
	server.Router.Use(mux.CORSMethodMiddleware(server.Router))
	// use fileserver for production
	prod := os.Getenv("PRODUCTION")

	if prod == "true" {
		server.Router.PathPrefix("/").Handler(http.FileServer(frontend.BuildHTTPFS()))
	} else {
		server.initializeRoutes()
	}
}

func (server *Server) Run(addr string) {
	c := cors.New(cors.Options{

		// AllowedOrigins: []string{"http://localhost:3030/"},
		AllowCredentials:   true,
		AllowedMethods:     []string{"GET", "POST", "OPTIONS", "PUT", "DELETE"},
		AllowedOrigins:     []string{"*"},
		AllowedHeaders:     []string{"Content-Type", "Authorization", "Bearer", "Bearer ", "content-type", "authorization", "Origin", "Accept"},
		OptionsPassthrough: true,
		// Enable Debugging for testing, consider disabling in production
		// Debug: true,
	})
	handler := c.Handler(server.Router)
	fmt.Println("\n Listening to port 8080")
	log.Fatal(http.ListenAndServe(addr, handler))
}
