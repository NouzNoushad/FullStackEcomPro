package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Set up user table
func (s *PostgresStore) createUserTable() error {
	query := `create table if not exists users(
		id text primary key,
		full_name text not null,
		email text unique not null,
		phone text,
		password_hash text not null,
		role text,
		image_name text,
		image_path text,
		updated_at timestamp default now(),
		created_at timestamp default now()
	)`

	_, err := s.db.Exec(query)

	return err
}

// Set up address table
func (s *PostgresStore) createAddressTable() error {
	query := `create table if not exists addresses(
		id text primary key,
		user_id text references users(id) on delete cascade,
		full_name text not null,
		phone text,
		street text,
		city text,
		state text,
		country text,
		zip_code text,
		is_default boolean,
		updated_at timestamp default now(),
		created_at timestamp default now()
	)`

	_, err := s.db.Exec(query)

	return err
}

func (s *PostgresStore) CreateAccount(user *User, addresses []*Address) error {
	// begin new transaction
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}

	// insert user
	query := `insert into users (
		id,
		full_name,
		email,
		phone,
		password_hash,
		role,
		image_name,
		image_path,
		updated_at,
		created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

	_, err = tx.Exec(
		query,
		user.ID,
		user.FullName,
		user.Email,
		user.Phone,
		user.Password_Hash,
		user.Role,
		user.ImageName,
		user.ImagePath,
		user.UpdatedAt,
		user.CreatedAt,
	)

	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to insert users: %v", err)
	}

	// insert address
	if len(addresses) > 0 {
		mediaQuery := `insert into addresses (
			id, 
			user_id,
			full_name,
			phone,
			street,
			city,
			state,
			country,
			zip_code,
			is_default,
			updated_at,
			created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

		stmt, err := tx.Prepare(mediaQuery)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to prepare address insert: %v", err)
		}
		defer stmt.Close()

		for _, address := range addresses {
			_, err := stmt.Exec(
				address.ID,
				address.UserID,
				address.FullName,
				address.Phone,
				address.Street,
				address.City,
				address.State,
				address.Country,
				address.ZipCode,
				address.IsDefault,
				address.UpdatedAt,
				address.CreatedAt,
			)
			if err != nil {
				tx.Rollback()
				return fmt.Errorf("failed to insert address: %v", err)
			}
		}
	}

	// commit transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	return nil
}

func (s *PostgresStore) EditAccount(id string, user *User) error {
	return nil
}

func (s *PostgresStore) DeleteAccount(id string) error {
	query := "delete from users where id = $1"
	_, err := s.db.Query(query, id)

	return err
}

func (s *PostgresStore) GetAccounts() ([]*User, error) {
	query := `
		select
			u.id,
			u.full_name,
			u.email,
			u.phone,
			u.password_hash,
			u.role,
			u.image_name,
			u.image_path,
			to_char(u.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS updated_at,
			to_char(u.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,

			coalesce(jsonb_agg(distinct jsonb_build_object(
				'id', a.id,
				'user_id', a.user_id,
				'full_name', a.full_name,
				'phone', a.phone,
				'street', a.street,
				'city', a.city,
				'state', a.state,
				'country', a.country,
				'zip_code', a.zip_code,
				'is_default', a.is_default,
				'updated_at', to_char(a.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
				'created_at', to_char(a.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
			)) filter (where a.id is not null), '[]'::jsonb) as addresses
		
		from users u
		left join addresses a on u.id = a.user_id
		group by u.id
		order by created_at desc
	`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []*User{}

	for rows.Next() {

		user, addressJson, updatedAtString, createdAtString, err := scanIntoUsers(rows)
		if err != nil {
			return nil, err
		}

		// parse created_at
		user.CreatedAt, err = parseTime(createdAtString)
		if err != nil {
			return nil, err
		}

		// parse updated_at
		user.UpdatedAt, err = parseTime(updatedAtString)
		if err != nil {
			return nil, err
		}

		// unmarshal address
		if err := json.Unmarshal(addressJson, &user.Address); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (s *PostgresStore) userAccountRow(query string, id string) (*User, error) {
	row := s.db.QueryRow(query, id)

	user, addressJson, updatedAtString, createdAtString, err := scanIntoUsers(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user with id [%s] not found", id)
		}
		return nil, err
	}

	// parse created_at
	user.CreatedAt, err = parseTime(createdAtString)
	if err != nil {
		return nil, err
	}

	// parse updated_at
	user.UpdatedAt, err = parseTime(updatedAtString)
	if err != nil {
		return nil, err
	}

	// unmarshal address
	if err := json.Unmarshal(addressJson, &user.Address); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *PostgresStore) GetAccountByID(id string) (*User, error) {
	query := `
		select
			u.id,
			u.full_name,
			u.email,
			u.phone,
			u.password_hash,
			u.role,
			u.image_name,
			u.image_path,
			to_char(u.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS updated_at,
			to_char(u.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,

			coalesce(jsonb_agg(distinct jsonb_build_object(
				'id', a.id,
				'user_id', a.user_id,
				'full_name', a.full_name,
				'phone', a.phone,
				'street', a.street,
				'city', a.city,
				'state', a.state,
				'country', a.country,
				'zip_code', a.zip_code,
				'is_default', a.is_default,
				'updated_at', to_char(a.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
				'created_at', to_char(a.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
			)) filter (where a.id is not null), '[]'::jsonb) as addresses
		
		from users u
		left join addresses a on u.id = a.user_id
		where u.id = $1
		group by u.id
	`

	user, err := s.userAccountRow(query, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *PostgresStore) GetAccountByEmail(email string) (*User, error) {
	query := `
		select
			u.id,
			u.full_name,
			u.email,
			u.phone,
			u.password_hash,
			u.role,
			u.image_name,
			u.image_path,
			to_char(u.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS updated_at,
			to_char(u.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,

			coalesce(jsonb_agg(distinct jsonb_build_object(
				'id', a.id,
				'user_id', a.user_id,
				'full_name', a.full_name,
				'phone', a.phone,
				'street', a.street,
				'city', a.city,
				'state', a.state,
				'country', a.country,
				'zip_code', a.zip_code,
				'is_default', a.is_default,
				'updated_at', to_char(a.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
				'created_at', to_char(a.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
			)) filter (where a.id is not null), '[]'::jsonb) as addresses
		
		from users u
		left join addresses a on u.id = a.user_id
		where u.email = $1
		group by u.id
	`

	user, err := s.userAccountRow(query, email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func scanIntoUsers(scanner scannable) (*User, []byte, string, string, error) {
	user := new(User)
	var addressJson []byte
	var updatedAtString, createdAtString string

	err := scanner.Scan(
		&user.ID,
		&user.FullName,
		&user.Email,
		&user.Phone,
		&user.Password_Hash,
		&user.Role,
		&user.ImageName,
		&user.ImagePath,
		&updatedAtString,
		&createdAtString,
		&addressJson,
	)

	return user, addressJson, updatedAtString, createdAtString, err
}

func (s *PostgresStore) CreateAddress(address *Address) error {
	query := `insert into addresses (
			id, 
			user_id,
			full_name,
			phone,
			street,
			city,
			state,
			country,
			zip_code,
			is_default,
			updated_at,
			created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`

	_, err := s.db.Query(
		query,
		address.ID,
		address.UserID,
		address.FullName,
		address.Phone,
		address.Street,
		address.City,
		address.State,
		address.Country,
		address.ZipCode,
		address.IsDefault,
		address.UpdatedAt,
		address.CreatedAt,
	)

	return err
}

func (s *PostgresStore) EditAddress(string, *Address) error {
	return nil
}

func (s *PostgresStore) DeleteAddress(id string) error {
	query := "delete from addresses where id = $1"
	_, err := s.db.Query(query, id)

	return err
}

func (s *PostgresStore) GetAddresses() ([]*Address, error) {
	query := "select * from addresses"
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	addresses := []*Address{}
	for rows.Next() {
		address, updatedAtStr, createdAtStr, err := scanIntoAddress(rows)
		if err != nil {
			return nil, err
		}

		// parse updatedAt
		address.UpdatedAt, err = parseTime(updatedAtStr)
		if err != nil {
			return nil, err
		}

		// parse createdAt
		address.CreatedAt, err = parseTime(createdAtStr)
		if err != nil {
			return nil, err
		}

		addresses = append(addresses, address)
	}

	return addresses, nil
}

func (s *PostgresStore) GetAddressByID(id string) (*Address, error) {
	query := "select * from addresses where id = $1"
	row := s.db.QueryRow(query, id)

	address, updatedAtStr, createdAtStr, err := scanIntoAddress(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("media with id [%s] not found", id)
		}
		return nil, err
	}

	// parse updatedAt
	address.UpdatedAt, err = parseTime(updatedAtStr)
	if err != nil {
		return nil, err
	}

	// parse createdAt
	address.CreatedAt, err = parseTime(createdAtStr)
	if err != nil {
		return nil, err
	}

	return address, nil
}

func scanIntoAddress(scanner scannable) (*Address, string, string, error) {
	address := new(Address)
	var updatedAtString, createdAtString string

	err := scanner.Scan(
		&address.ID,
		&address.UserID,
		&address.FullName,
		&address.Phone,
		&address.Street,
		&address.City,
		&address.State,
		&address.Country,
		&address.ZipCode,
		&address.IsDefault,
		&updatedAtString,
		&createdAtString,
	)

	return address, updatedAtString, createdAtString, err
}
