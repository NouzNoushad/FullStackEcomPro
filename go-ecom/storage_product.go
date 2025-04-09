package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"time"
)

// Set up product table
func (s *PostgresStore) createProductTable() error {
	query := `create table if not exists product(
		id text primary key,
		thumbnail_name text,
		thumbnail_path text,
		status text,
		category text,
		tag text,
		template text,
		name text not null,
		description text,
		price numeric not null,
		discount_type text,
		tax_class text,
		vat_amount numeric,
		sku_number text not null,
		barcode_number text not null,
		on_shelf numeric not null,
		on_warehouse numeric,
		allow_backorder boolean not null,
		in_physical boolean,
		meta_title text,
		meta_description text,
		meta_keywords text,
		variations jsonb,
		created_at timestamp default now()
	)`

	_, err := s.db.Exec(query)

	return err
}

// Set up media table
func (s *PostgresStore) createMediaTable() error {
	query := `create table if not exists media(
		id text primary key,
		product_id text references product(id) on delete cascade,
		media_filename text,
		media_file_path text,
		created_at timestamp default now()
	)`

	_, err := s.db.Exec(query)

	return err
}

// Add Media
func (s *PostgresStore) AddMedia(media *Media) error {
	query := `insert into media (
		id, 
		product_id, 
		media_filename, 
		media_file_path, 
		created_at) values ($1, $2, $3, $4, $5)`

	_, err := s.db.Query(
		query,
		media.ID,
		media.ProductID,
		media.MediaFilename,
		media.MediaFilePath,
		media.CreatedAt,
	)

	return err
}

// Add Produt Transaction
func (s *PostgresStore) AddProductTransaction(product *Product, variations []byte, medias []*Media) error {

	// begin new transaction
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}

	// insert product
	query := `insert into product (
		id,
		thumbnail_name,
		thumbnail_path,
		status,
		category,
		tag,
		template,
		name,
		description,
		price,
		discount_type,
		tax_class,
		vat_amount,
		sku_number,
		barcode_number,
		on_shelf,
		on_warehouse,
		allow_backorder,
		in_physical,
		meta_title,
		meta_description,
		meta_keywords,
		variations,
		created_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`

	_, err = tx.Exec(
		query,
		product.ID,
		product.ThumbnailName,
		product.ThumbnailPath,
		product.Status,
		product.Category,
		product.Tag,
		product.Template,
		product.Name,
		product.Description,
		product.Price,
		product.DiscountType,
		product.TaxClass,
		product.VATAmount,
		product.SKUNumber,
		product.BarcodeNumber,
		product.OnShelf,
		product.OnWarehouse,
		product.AllowBackOrder,
		product.InPhysical,
		product.MetaTitle,
		product.MetaDescription,
		product.MetaKeywords,
		variations,
		product.CreatedAt,
	)

	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to insert product: %v", err)
	}

	// insert media
	if len(medias) > 0 {
		mediaQuery := `insert into media (
			id, 
			product_id, 
			media_filename, 
			media_file_path, 
			created_at) values ($1, $2, $3, $4, $5)`
		stmt, err := tx.Prepare(mediaQuery)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to prepare media insert: %v", err)
		}
		defer stmt.Close()

		for _, media := range medias {
			_, err := stmt.Exec(
				media.ID,
				product.ID,
				media.MediaFilename,
				media.MediaFilePath,
				media.CreatedAt,
			)
			if err != nil {
				tx.Rollback()
				return fmt.Errorf("failed to insert media: %v", err)
			}
		}
	}

	// commit transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	return nil
}

// Edit Product
func (s *PostgresStore) EditProduct(id string, product *Product, variations []byte, medias []*Media) error {
	// begin transaction
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}

	// insert product
	query := `update product set 
		thumbnail_name = $1,
		thumbnail_path = $2,
		status = $3,
		category = $4,
		tag = $5,
		template = $6,
		name = $7,
		description = $8,
		price = $9,
		discount_type = $10,
		tax_class = $11,
		vat_amount = $12,
		sku_number = $13,
		barcode_number = $14,
		on_shelf = $15,
		on_warehouse = $16,
		allow_backorder = $17,
		in_physical = $18,
		meta_title = $19,
		meta_description = $20,
		meta_keywords = $21,
		variations = $22 
		where id = $23`

	_, err = tx.Exec(
		query,
		product.ThumbnailName,
		product.ThumbnailPath,
		product.Status,
		product.Category,
		product.Tag,
		product.Template,
		product.Name,
		product.Description,
		product.Price,
		product.DiscountType,
		product.TaxClass,
		product.VATAmount,
		product.SKUNumber,
		product.BarcodeNumber,
		product.OnShelf,
		product.OnWarehouse,
		product.AllowBackOrder,
		product.InPhysical,
		product.MetaTitle,
		product.MetaDescription,
		product.MetaKeywords,
		variations,
		product.ID,
	)

	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to update product: %v", err)
	}

	if len(medias) > 0 {
		for _, media := range medias {
			mediaQuery := `insert into media (
				id, 
				product_id, 
				media_filename, 
				media_file_path, 
				created_at) values ($1, $2, $3, $4, $5)`

			_, err := tx.Exec(
				mediaQuery,
				media.ID,
				product.ID,
				media.MediaFilename,
				media.MediaFilePath,
				media.CreatedAt,
			)

			if err != nil {
				tx.Rollback()
				return fmt.Errorf("failed to update new media: %v", err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	return nil
}

// Get Products
func (s *PostgresStore) GetProducts() ([]*Product, error) {
	query := `
		select
			p.id,
			p.thumbnail_name,
			p.thumbnail_path,
			p.status,
			p.category,
			p.tag,
			p.template,
			p.name,
			p.description,
			p.price,
			p.discount_type,
			p.tax_class,
			p.vat_amount,
			p.sku_number,
			p.barcode_number,
			p.on_shelf,
			p.on_warehouse,
			p.allow_backorder,
			p.in_physical,
			p.meta_title,
			p.meta_description,
			p.meta_keywords,
			p.variations,
			to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,

			coalesce(jsonb_agg(distinct jsonb_build_object(
				'id', m.id,
				'media_filename', m.media_filename,
				'media_file_path', m.media_file_path,
				'created_at', to_char(m.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
			)) filter (where m.id is not null), '[]'::jsonb) as media
		
		from product p
		left join media m on p.id = m.product_id
		group by p.id
		order by created_at desc
	`
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []*Product{}
	for rows.Next() {

		product, variationsJson, mediaJson, createdAtStr, err := scanIntoProduct(rows)
		if err != nil {
			return nil, err
		}

		// parse created_at
		product.CreatedAt, err = parseTime(createdAtStr)
		if err != nil {
			return nil, err
		}

		// unmarshal variations
		var variations map[string][]string
		if err := json.Unmarshal(variationsJson, &variations); err != nil {
			return nil, err
		}

		// unmarshal media
		if err := json.Unmarshal(mediaJson, &product.Media); err != nil {
			return nil, err
		}

		product.Variations = variations
		products = append(products, product)
	}

	return products, nil
}

// Get Medias
func (s *PostgresStore) GetMedias() ([]*Media, error) {
	query := "select * from media"
	rows, err := s.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	medias := []*Media{}
	for rows.Next() {
		media, createdAtStr, err := scanIntoMedia(rows)
		if err != nil {
			return nil, err
		}

		// parse createdAt
		media.CreatedAt, err = parseTime(createdAtStr)
		if err != nil {
			return nil, err
		}

		medias = append(medias, media)
	}

	return medias, nil
}

// Get Product by id
func (s *PostgresStore) GetProductByID(id string) (*Product, error) {
	query := `
		select
			p.id,
			p.thumbnail_name,
			p.thumbnail_path,
			p.status,
			p.category,
			p.tag,
			p.template,
			p.name,
			p.description,
			p.price,
			p.discount_type,
			p.tax_class,
			p.vat_amount,
			p.sku_number,
			p.barcode_number,
			p.on_shelf,
			p.on_warehouse,
			p.allow_backorder,
			p.in_physical,
			p.meta_title,
			p.meta_description,
			p.meta_keywords,
			p.variations,
			to_char(p.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,

			coalesce(jsonb_agg(distinct jsonb_build_object(
				'id', m.id,
				'media_filename', m.media_filename,
				'media_file_path', m.media_file_path,
				'created_at', to_char(m.created_at, 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')
			)) filter (where m.id is not null), '[]'::jsonb) as media
		
		from product p
		left join media m on p.id = m.product_id
		where p.id = $1
		group by p.id
	`

	row := s.db.QueryRow(query, id)

	product, variationsJson, mediaJson, createdAtStr, err := scanIntoProduct(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("product with id [%s] not found", id)
		}
		return nil, err
	}

	// parse created-at
	product.CreatedAt, err = parseTime(createdAtStr)
	if err != nil {
		return nil, err
	}

	// unmarshal variations
	var variations map[string][]string
	if err := json.Unmarshal(variationsJson, &variations); err != nil {
		return nil, err
	}

	// unmarshal media
	if err := json.Unmarshal(mediaJson, &product.Media); err != nil {
		return nil, err
	}

	product.Variations = variations

	return product, nil

}

// Get Media by id
func (s *PostgresStore) GetMediaByID(id string) (*Media, error) {
	query := "select * from media where id = $1"
	row := s.db.QueryRow(query, id)

	media, createdAtStr, err := scanIntoMedia(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("media with id [%s] not found", id)
		}
		return nil, err
	}

	media.CreatedAt, err = parseTime(createdAtStr)
	if err != nil {
		return nil, err
	}

	return media, nil
}

// Get Media by product id
func (s *PostgresStore) GetMediasByProductID(productId string) ([]*Media, error) {
	query := "select * from media where product_id = $1"
	rows, err := s.db.Query(query, productId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	medias := []*Media{}
	for rows.Next() {
		media, createdAtStr, err := scanIntoMedia(rows)
		if err != nil {
			return nil, err
		}

		// parse createdAt
		media.CreatedAt, err = parseTime(createdAtStr)
		if err != nil {
			return nil, err
		}

		medias = append(medias, media)
	}

	return medias, nil
}

// Delete Product
func (s *PostgresStore) DeleteProduct(id string) error {
	query := "delete from product where id = $1"
	_, err := s.db.Query(query, id)

	return err
}

// Delete Media
func (s *PostgresStore) DeleteMedia(id string) error {
	query := "delete from media where id = $1"
	_, err := s.db.Query(query, id)

	return err
}

// scan into product
func scanIntoProduct(scanner scannable) (*Product, []byte, []byte, string, error) {
	product := new(Product)
	var mediaJson []byte
	var createdAtStr string
	var variationsJson []byte

	err := scanner.Scan(
		&product.ID,
		&product.ThumbnailName,
		&product.ThumbnailPath,
		&product.Status,
		&product.Category,
		&product.Tag,
		&product.Template,
		&product.Name,
		&product.Description,
		&product.Price,
		&product.DiscountType,
		&product.TaxClass,
		&product.VATAmount,
		&product.SKUNumber,
		&product.BarcodeNumber,
		&product.OnShelf,
		&product.OnWarehouse,
		&product.AllowBackOrder,
		&product.InPhysical,
		&product.MetaTitle,
		&product.MetaDescription,
		&product.MetaKeywords,
		&variationsJson,
		&createdAtStr,
		&mediaJson,
	)

	return product, variationsJson, mediaJson, createdAtStr, err
}

// scan into media
func scanIntoMedia(scanner scannable) (*Media, string, error) {
	media := new(Media)
	var createdAtStr string

	err := scanner.Scan(
		&media.ID,
		&media.ProductID,
		&media.MediaFilename,
		&media.MediaFilePath,
		&createdAtStr,
	)

	return media, createdAtStr, err
}

// parse time
func parseTime(createdAt string) (string, error) {
	parsedTime, err := time.Parse("2006-01-02T15:04:05.999999Z", createdAt)
	if err != nil {
		return "", err
	}

	return parsedTime.Format(time.RFC3339), nil
}