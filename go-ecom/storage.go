package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// Storage
type Storage interface {

	// product
	AddProductTransaction(*Product, []byte, []*Media) error
	EditProduct(string, *Product, []byte, []*Media) error
	GetProducts() ([]*Product, error)
	GetProductByID(string) (*Product, error)
	DeleteProduct(string) error
	// media
	AddMedia(*Media) error
	GetMedias() ([]*Media, error)
	GetMediaByID(string) (*Media, error)
	GetMediasByProductID(string) ([]*Media, error)
	DeleteMedia(string) error
	// user
	CreateAccount(*User, []*Address) error
	EditAccount(string, *User) error
	DeleteAccount(string) error
	GetAccounts() ([]*User, error)
	GetAccountByID(string) (*User, error)
	GetAccountByEmail(string) (*User, error)
	// address
	CreateAddress(*Address) error
	EditAddress(string, *Address) error
	DeleteAddress(string) error
	GetAddresses() ([]*Address, error)
	GetAddressByID(string) (*Address, error)
	// cart
	CreateCart(*Cart) error
	DeleteCart(string) error
	GetCarts() ([]*Cart, error)
	GetCartByID(string) (*Cart, error)
}

// Postgresql store
type PostgresStore struct {
	db *sql.DB
}

// Set up database
func NewPostgresStore() (*PostgresStore, error) {
	// connect to .env file
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	connStr := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &PostgresStore{
		db: db,
	}, nil
}

// Init database
func (s *PostgresStore) InitDB() error {
	if err := s.createProductTable(); err != nil {
		return err
	}

	if err := s.createMediaTable(); err != nil {
		return err
	}

	if err := s.createUserTable(); err != nil {
		return err
	}

	if err := s.createAddressTable(); err != nil {
		return err
	}

	return s.createCartTable()
}

type scannable interface {
	Scan(dest ...interface{}) error
}
