package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

type APIServer struct {
	listenAddr string
	store      Storage
}

func NewAPIServer(listenAdr string, store Storage) *APIServer {
	return &APIServer{
		listenAddr: listenAdr,
		store:      store,
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle OPTIONS method (preflight request)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func Static(r *mux.Router, pathPrefix string, dir string) {
	r.PathPrefix(pathPrefix).Handler(http.StripPrefix(pathPrefix, http.FileServer(http.Dir(dir))))
}

type FuncType int

const (
	UserAccount FuncType = iota
	UserAddress
	EmailAddress
)

// router
func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/product", makeHandleFunc(s.handleProduct))
	router.HandleFunc("/product/{id}", makeHandleFunc(s.handleProductByID))
	router.HandleFunc("/media", makeHandleFunc(s.handleMedia))
	router.HandleFunc("/media/{id}", makeHandleFunc(s.handleMediaByID))
	router.HandleFunc("/account", makeHandleFunc(s.handleAccount))
	router.HandleFunc("/address", makeHandleFunc(s.handleAddress))
	router.HandleFunc("/login", makeHandleFunc(s.handleLogin))
	router.HandleFunc("/account/{id}", withJWTAuth(makeHandleFunc(s.handleAccountByID), s.store, UserAccount))
	router.HandleFunc("/address/{id}", withJWTAuth(makeHandleFunc(s.handleAddressByID), s.store, UserAddress))
	router.HandleFunc("/user/{email}", withJWTAuth(makeHandleFunc(s.handleAccountByEmailID), s.store, EmailAddress))
	router.HandleFunc("/cart", makeHandleFunc(s.handleCart))
	router.HandleFunc("/cart/{id}", makeHandleFunc(s.handleCartByID))

	Static(router, "/uploads/", "./uploads")
	Static(router, "/medias/", "./medias")

	http.ListenAndServe(s.listenAddr, corsMiddleware(router))
}

// get ID
func getID(r *http.Request) string {
	id := mux.Vars(r)["id"]

	return id
}

// get Email
func getEmail(r *http.Request) string {
	email := mux.Vars(r)["email"]

	return email
}

// parse error
func badRequestError(w http.ResponseWriter, errStr string) error {
	return WriteJSON(w, http.StatusBadRequest, ApiError{Error: errStr})
}

// server error
func serverError(w http.ResponseWriter, errStr string) error {
	return WriteJSON(w, http.StatusInternalServerError, ApiError{Error: errStr})
}

// string to float
func stringToFloat(value string) (float64, error) {
	valueParsed, err := strconv.ParseFloat(value, 64)
	if err != nil {
		return 0, err
	}
	return valueParsed, nil
}

// string to int
func stringToInt(value string) (int64, error) {
	valueParsed, err := strconv.ParseInt(value, 0, 64)
	if err != nil {
		return 0, err
	}
	return valueParsed, nil
}

// string to bool
func stringToBool(value string) (bool, error) {
	valueParsed, err := strconv.ParseBool(value)
	if err != nil {
		return false, err
	}
	return valueParsed, nil
}

// json output
func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-type", "application/json")
	w.WriteHeader(status)

	return json.NewEncoder(w).Encode(v)
}

// api error
type ApiError struct {
	Error string `json:"error"`
}

type apiFunc func(http.ResponseWriter, *http.Request) error

// handle func wrapper
func makeHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
		}
	}
}

func createJWT(user *User) (string, error) {
	claims := &jwt.MapClaims{
		"expiresAt": 15000,
		"email":     user.Email,
	}

	secret := os.Getenv("SECRET_KEY")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}

func permissionDenied(w http.ResponseWriter) {
	WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
}

func withJWTAuth(handlerFunc http.HandlerFunc, s Storage, f FuncType) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("calling JWT auth middleware")

		tokenString := r.Header.Get("x-jwt-token")
		token, err := validateJWT(tokenString)
		if err != nil {
			permissionDenied(w)
			return
		}

		if !token.Valid {
			permissionDenied(w)
			return
		}

		user := new(User)

		if f == UserAddress || f == UserAccount {
			id := getID(r)

			var userID string

			if f == UserAddress {
				address, err := s.GetAddressByID(id)
				if err != nil {
					permissionDenied(w)
					return
				}

				userID = address.UserID
			} else {
				userID = id
			}

			user, err = s.GetAccountByID(userID)
			if err != nil {
				permissionDenied(w)
				return
			}

		} else {

			email := getEmail(r)

			user, err = s.GetAccountByEmail(email)
			if err != nil {
				permissionDenied(w)
				return
			}
		}

		claims := token.Claims.(jwt.MapClaims)
		if user.Email != claims["email"] {
			permissionDenied(w)
			return
		}

		handlerFunc(w, r)
	}
}

func validateJWT(tokenString string) (*jwt.Token, error) {
	secret := os.Getenv("SECRET_KEY")

	return jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}

		return []byte(secret), nil
	})
}

func EncryptPassword(pw string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(pw), bcrypt.DefaultCost)
}

func (a *User) ValidPassword(pw string) bool {
	return bcrypt.CompareHashAndPassword([]byte(a.Password_Hash), []byte(pw)) == nil
}
