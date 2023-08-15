package middlewares

import (
	"errors"
	"net/http"

	"github.com/KnockOutEZ/rest-api-portfolio/api/auth"
	"github.com/KnockOutEZ/rest-api-portfolio/api/responses"
)


func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	}

func SetMiddlewareJSON(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		w.Header().Set("Content-Type", "application/json")
		//start cors
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE")
		if r.Method == "OPTIONS" {
                    return
                }
		//till here
		next.ServeHTTP(w, r)
	}
}

func SetMiddlewareAuthentication(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		err := auth.TokenValid(r)
		if err != nil {
			responses.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
			return
		}
		w.Header().Set("Content-Type", "application/json")
		//start cors
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE")
		if r.Method == "OPTIONS" {
                    return
                }
		//till here
		next.ServeHTTP(w, r)
	}
}
