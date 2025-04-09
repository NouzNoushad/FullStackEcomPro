package main

import (
	"database/sql"
	"fmt"
)

// Set up cart table
func (s *PostgresStore) createCartTable() error {
	query := `create table if not exists carts (
		id text primary key,
		product_id text not null,
		price numeric(10, 2) default 0.00,
		quantity numeric(10, 0) default 0,
		total_price numeric(10, 2) default 0.00,
		updated_at timestamp default now(),
		created_at timestamp default now()
	)`

	_, err := s.db.Exec(query)

	return err
}

// create cart
func (s *PostgresStore) CreateCart(cart *Cart) error {
	query := `insert into carts(
		id,
		product_id,
		price,
		quantity,
		total_price,
		updated_at,
		created_at) values ($1, $2, $3, $4, $5, $6, $7)`

	_, err := s.db.Query(
		query,
		cart.ID,
		cart.ProductID,
		cart.Price,
		cart.Quantity,
		cart.TotalPrice,
		cart.UpdatedAt,
		cart.CreatedAt,
	)

	return err
}

// delete cart
func (s *PostgresStore) DeleteCart(id string) error {
	query := "delete from carts where id = $1"
	_, err := s.db.Query(query, id)

	return err
}

// get carts
func (s *PostgresStore) GetCarts() ([]*Cart, error) {
	query := "select * from carts order by created_at desc"

	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	carts := []*Cart{}

	for rows.Next() {
		cart, updatedAtString, createdAtString, err := scanIntoCarts(rows)
		if err != nil {
			return nil, err
		}

		// parse created_at
		cart.CreatedAt, err = parseTime(createdAtString)
		if err != nil {
			return nil, err
		}

		// parse updated_at
		cart.UpdatedAt, err = parseTime(updatedAtString)
		if err != nil {
			return nil, err
		}

		carts = append(carts, cart)
	}

	return carts, nil
}

func (s *PostgresStore) cartRow(query string, id string) (*Cart, error) {
	row := s.db.QueryRow(query, id)

	cart, updatedAtString, createdAtString, err := scanIntoCarts(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("cart with id [%s] not found", id)
		}
	}

	// parse created_at
	cart.CreatedAt, err = parseTime(createdAtString)
	if err != nil {
		return nil, err
	}

	// parse updated_at
	cart.UpdatedAt, err = parseTime(updatedAtString)
	if err != nil {
		return nil, err
	}

	return cart, nil
}

// get cart by id
func (s *PostgresStore) GetCartByID(id string) (*Cart, error) {
	query := "select * from carts where id = $1"

	cart, err := s.cartRow(query, id)
	if err != nil {
		return nil, err
	}

	return cart, nil
}

func scanIntoCarts(scanner scannable) (*Cart, string, string, error) {
	cart := new(Cart)
	var updatedAtString, createdAtString string

	err := scanner.Scan(
		&cart.ID,
		&cart.ProductID,
		&cart.Price,
		&cart.Quantity,
		&cart.TotalPrice,
		&updatedAtString,
		&createdAtString,
	)

	return cart, updatedAtString, createdAtString, err
}
