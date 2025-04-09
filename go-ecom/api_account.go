package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"time"

	"github.com/google/uuid"
)

// handle request methods (login)
func (s *APIServer) handleLogin(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		return s.handleUserLogin(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (account)
func (s *APIServer) handleAccount(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAccounts(w, r)
	}

	if r.Method == "POST" {
		return s.handleCreateAccount(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (account by id)
func (s *APIServer) handleAccountByID(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAccountByID(w, r)
	}

	if r.Method == "DELETE" {
		return s.handleDeleteAccount(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (account by email id)
func (s *APIServer) handleAccountByEmailID(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAccountByEmailID(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (address)
func (s *APIServer) handleAddress(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAddresses(w, r)
	}

	if r.Method == "POST" {
		return s.handleCreateAddress(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (address by id)
func (s *APIServer) handleAddressByID(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAddressByID(w, r)
	}

	if r.Method == "DELETE" {
		return s.handleDeleteAddress(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle get accounts
func (s *APIServer) handleGetAccounts(w http.ResponseWriter, _ *http.Request) error {
	users, err := s.store.GetAccounts()
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data":  users,
		"items": fmt.Sprintf("%d items", len(users)),
	})
}

// validate password
func isValidPassword(password string) bool {
	// password length
	if len(password) < 8 {
		return false
	}

	// check if password contains at least one uppercase letter
	hasUpperCase := regexp.MustCompile(`[A-Z]`).MatchString(password)
	if !hasUpperCase {
		return false
	}

	// check if password contains atleast one number
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	if !hasNumber {
		return false
	}

	// check if password contains atleast one special character
	hasSpecialCharacter := regexp.MustCompile(`[!@#$^&*(),.?":{}|<>]`).MatchString(password)
	return hasSpecialCharacter
}

func isValidEmail(email string) bool {
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	return regexp.MustCompile(emailRegex).MatchString(email)
}

// account validation
func accountValidation(user *User, password string) error {

	// name
	if user.FullName == "" {
		return validationError("Name is required")
	}

	// email
	if user.Email == "" {
		return validationError("Email is required")
	}

	if !isValidEmail(user.Email) {
		return validationError("Invalid email")
	}

	// discount_type
	if !isValidPassword(password) {
		return validationError("Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character")
	}

	// role
	if !isValidRole(user.Role) {
		return validationError("Invalid role")
	}

	return nil
}

// handle user login
func (s *APIServer) handleUserLogin(w http.ResponseWriter, r *http.Request) error {

	// parse multipart form
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		return badRequestError(w, "Failed to parse form")
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	if email == "" {
		return badRequestError(w, "Email is required")
	}
	if !isValidEmail(email) {
		return badRequestError(w, "Invalid email")
	}

	acc, err := s.store.GetAccountByEmail(email)
	if err != nil {
		return err
	}

	if !acc.ValidPassword(password) {
		return fmt.Errorf("not authenticated")
	}

	token, err := createJWT(acc)
	if err != nil {
		return err
	}

	resp := LoginResponse{
		Token: token,
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"message": "Login success",
		"data":    resp,
	})
}

// handle create account
func (s *APIServer) handleCreateAccount(w http.ResponseWriter, r *http.Request) error {
	user := new(User)

	// parse multipart form
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		return badRequestError(w, "Failed to parse form")
	}

	user.ID = uuid.New().String()
	user.FullName = r.FormValue("full_name")
	user.Email = r.FormValue("email")
	user.Phone = r.FormValue("phone")
	user.Role = r.FormValue("role")

	user.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
	user.CreatedAt = time.Now().UTC().Format(time.RFC3339)

	password := r.FormValue("password")

	// validation
	if err := accountValidation(user, password); err != nil {
		return badRequestError(w, err.Error())
	}

	// hash password
	encpw, err := EncryptPassword(password)
	if err != nil {
		return serverError(w, "Error hashing password")
	}

	user.Password_Hash = string(encpw)

	// create file
	file, fileHeader, err := r.FormFile("image")
	if err == nil {
		// create upload dir
		uploadDir := "users"
		if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
			return validationError("Failed to create uploads directory")
		}

		// save file
		fileName := uuid.New().String() + "_" + fileHeader.Filename
		filePath := filepath.Join(uploadDir, fileName)
		outFile, err := os.Create(filePath)
		if err != nil {
			return validationError("Failed to save file")
		}
		defer outFile.Close()

		// copy file contents
		_, err = io.Copy(outFile, file)
		if err != nil {
			return validationError("Failed to copy file")
		}
		user.ImageName = fileName
		user.ImagePath = filePath
	} else {
		user.ImageName = ""
		user.ImagePath = ""
	}

	addressesData := r.MultipartForm.Value["addresses"]
	addresses := []*Address{}

	if len(addressesData) > 0 {
		err := json.Unmarshal([]byte(addressesData[0]), &addresses)
		if err != nil {
			return serverError(w, "failed to parse the json")
		}

		for _, address := range addresses {
			newAddress := Address{
				ID:        uuid.New().String(),
				UserID:    user.ID,
				FullName:  address.FullName,
				Phone:     address.Phone,
				Street:    address.Street,
				City:      address.City,
				State:     address.State,
				Country:   address.Country,
				ZipCode:   address.ZipCode,
				IsDefault: address.IsDefault,
				UpdatedAt: time.Now().UTC().Format(time.RFC3339),
				CreatedAt: time.Now().UTC().Format(time.RFC3339),
			}

			addresses = append(addresses, &newAddress)
		}
	}

	user.Address = addresses

	// store
	if err := s.store.CreateAccount(user, addresses); err != nil {
		return serverError(w, err.Error())
	}

	// success
	return WriteJSON(w, http.StatusCreated, map[string]interface{}{
		"message": "User created",
		"data":    user,
	})
}

func (s *APIServer) handleGetAccountByEmailID(w http.ResponseWriter, r *http.Request) error {

	email := getEmail(r)

	account, err := s.store.GetAccountByEmail(email)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data": account,
	})
}

func (s *APIServer) handleGetAccountByID(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	account, err := s.store.GetAccountByID(id)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data": account,
	})
}

// handle delete account
func (s *APIServer) handleDeleteAccount(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	account, err := s.store.GetAccountByID(id)
	if err != nil {
		return err
	}

	// remove image from users
	if err := os.Remove(account.ImagePath); err != nil {
		return err
	}

	if err := s.store.DeleteAccount(id); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"message": fmt.Sprintf("User account with email [%s] is deleted", account.Email),
		"id":      id,
	})
}

// address validation
func addressValidation(address *Address) error {

	// user id
	if address.UserID == "" {
		return validationError("User ID is required")
	}

	return nil
}

func (s *APIServer) handleCreateAddress(w http.ResponseWriter, r *http.Request) error {
	address := new(Address)

	// parse multipart form
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		return badRequestError(w, "Failed to parse form")
	}

	address.ID = uuid.New().String()
	address.UserID = r.FormValue("user_id")
	address.FullName = r.FormValue("full_name")
	address.Phone = r.FormValue("phone")
	address.Street = r.FormValue("street")
	address.City = r.FormValue("city")
	address.State = r.FormValue("state")
	address.Country = r.FormValue("country")
	address.ZipCode = r.FormValue("zip_code")

	address.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
	address.CreatedAt = time.Now().UTC().Format(time.RFC3339)

	address.IsDefault, err = stringToBool(r.FormValue("is_default"))
	if err != nil {
		return badRequestError(w, "Invalid is default format")
	}

	if err := addressValidation(address); err != nil {
		return badRequestError(w, err.Error())
	}

	// store
	if err := s.store.CreateAddress(address); err != nil {
		return serverError(w, err.Error())
	}

	// success
	return WriteJSON(w, http.StatusCreated, map[string]interface{}{
		"message": "User Address created",
		"data":    address,
	})
}

func (s *APIServer) handleGetAddresses(w http.ResponseWriter, _ *http.Request) error {
	addresses, err := s.store.GetAddresses()
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data":  addresses,
		"items": fmt.Sprintf("%d items", len(addresses)),
	})
}

func (s *APIServer) handleGetAddressByID(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	address, err := s.store.GetAddressByID(id)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data": address,
	})
}

func (s *APIServer) handleDeleteAddress(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	if err := s.store.DeleteAddress(id); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"message": "address deleted",
		"id":      id,
	})
}
