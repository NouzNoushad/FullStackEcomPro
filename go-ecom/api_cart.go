package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
)

// handle request methods (cart)
func (s *APIServer) handleCart(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		return s.handleAddCart(w, r)
	}

	if r.Method == "GET" {
		return s.handleGetCarts(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle request methods (cart by id)
func (s *APIServer) handleCartByID(w http.ResponseWriter, r *http.Request) error {

	if r.Method == "GET" {
		return s.handleGetCartByID(w, r)
	}

	if r.Method == "DELETE" {
		return s.handleDeleteCart(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

// handle get carts
func (s *APIServer) handleGetCarts(w http.ResponseWriter, _ *http.Request) error {
	carts, err := s.store.GetCarts()
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data":  carts,
		"items": fmt.Sprintf("%d items", len(carts)),
	})
}

// cart validation
func cartValidation(cart *Cart) error {

	// product id
	if cart.ProductID == "" {
		return validationError("Product Id is required")
	}

	return nil
}

// handle create cart
func (s *APIServer) handleAddCart(w http.ResponseWriter, r *http.Request) error {
	cart := new(Cart)

	// parse multipart form
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		return badRequestError(w, "Failed to parse form")
	}

	cart.ID = uuid.New().String()
	cart.ProductID = r.FormValue("product_id")
	cart.Price, err = stringToFloat(r.FormValue("price"))
	if err != nil {
		return badRequestError(w, "Invalid price format")
	}
	cart.Quantity, err = stringToInt(r.FormValue("quantity"))
	if err != nil {
		return badRequestError(w, "Invalid quantity format")
	}
	cart.UpdatedAt = time.Now().UTC().Format(time.RFC3339)
	cart.CreatedAt = time.Now().UTC().Format(time.RFC3339)

	cart.TotalPrice = float64(cart.Quantity) * cart.Price

	if err := cartValidation(cart); err != nil {
		return badRequestError(w, err.Error())
	}

	// store
	if err := s.store.CreateCart(cart); err != nil {
		return serverError(w, err.Error())
	}

	// success
	return WriteJSON(w, http.StatusCreated, map[string]interface{}{
		"message": "Added to Cart",
		"data":    cart,
	})
}

// handle cart by id
func (s *APIServer) handleGetCartByID(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	cart, err := s.store.GetCartByID(id)
	if err != nil {
		return err
	}

	// success
	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"data": cart,
	})
}

// handle delete cart
func (s *APIServer) handleDeleteCart(w http.ResponseWriter, r *http.Request) error {
	id := getID(r)

	if err := s.store.DeleteCart(id); err != nil {
		return err
	}

	// success
	return WriteJSON(w, http.StatusOK, map[string]interface{}{
		"message": fmt.Sprintf("Cart with id [%s] is deleted", id),
		"id":      id,
	})
}
