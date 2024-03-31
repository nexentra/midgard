package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rosedblabs/rosedb/v2"

	_ "github.com/jinzhu/gorm/dialects/mysql"    //mysql database driver
	_ "github.com/jinzhu/gorm/dialects/postgres" //postgres database driver

	"github.com/nexentra/midgard/api/models"
)

type Server struct {
	DB   *gorm.DB
	KVDB *rosedb.DB
	Echo *echo.Echo
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
		DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", DbHost, DbPort, DbUser, DbName, DbPassword)
		if os.Getenv("DATABASE_URL") != "" {
			DBURL = os.Getenv("DATABASE_URL")
		}
		server.DB, err = gorm.Open(Dbdriver, DBURL)
		if err != nil {
			fmt.Printf("Cannot connect to %s database", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database", Dbdriver)
		}
	}

	server.DB.Debug().AutoMigrate(&models.User{}, &models.CustomSchema{}) //database migration

	server.Echo = echo.New()
	server.Echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodOptions, http.MethodPut, http.MethodDelete},
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Bearer", "Bearer ", "content-type", "authorization", "Origin", "Accept"},
	}))

	options := rosedb.DefaultOptions
	options.DirPath = "/tmp/rosedb"

	db, err := rosedb.Open(options)
	if err != nil {
		fmt.Println("Cannot connect to rosedb")
		log.Fatal("This is the error:", err)
	}

	server.KVDB = db

	server.initializeRoutes()

	// defer func() {
	// 	_ = db.Close()
	// }()

}

func (server *Server) Run(addr string) {
	fmt.Println("\n Listening to port 8080")
	log.Fatal(server.Echo.Start(addr))
}
