package main

type Media struct {
	ID            string `json:"id"`
	ProductID     string `json:"product_id"`
	MediaFilename string `json:"media_filename"`
	MediaFilePath string `json:"media_file_path"`
	CreatedAt     string `json:"created_at"`
}

type Product struct {
	ID              string              `json:"id"`
	ThumbnailName   string              `json:"thumbnail_name"`
	ThumbnailPath   string              `json:"thumbnail_path"`
	Status          string              `json:"status"`
	Category        string              `json:"category"`
	Tag             string              `json:"tag"`
	Template        string              `json:"template"`
	Name            string              `json:"name"`
	Description     string              `json:"description"`
	Price           float64             `json:"price"`
	DiscountType    string              `json:"discount_type"`
	TaxClass        string              `json:"tax_class"`
	VATAmount       float64             `json:"vat_amount"`
	SKUNumber       string              `json:"sku_number"`
	BarcodeNumber   string              `json:"barcode_number"`
	OnShelf         int64               `json:"on_shelf"`
	OnWarehouse     int64               `json:"on_warehouse"`
	AllowBackOrder  bool                `json:"allow_backorder"`
	InPhysical      bool                `json:"in_physical"`
	MetaTitle       string              `json:"meta_title"`
	MetaDescription string              `json:"meta_description"`
	MetaKeywords    string              `json:"meta_keywords"`
	Variations      map[string][]string `json:"variations"`
	Media           []*Media            `json:"media"`
	CreatedAt       string              `json:"created_at"`
}

type Address struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	FullName  string `json:"full_name"`
	Phone     string `json:"phone"`
	Street    string `json:"street"`
	City      string `json:"city"`
	State     string `json:"state"`
	Country   string `json:"country"`
	ZipCode   string `json:"zip_code"`
	IsDefault bool   `json:"is_default"`
	UpdatedAt string `json:"updated_at"`
	CreatedAt string `json:"created_at"`
}

type User struct {
	ID            string     `json:"id"`
	FullName      string     `json:"full_name"`
	Email         string     `json:"email"`
	Phone         string     `json:"phone"`
	Password_Hash string     `json:"password_hash"`
	Role          string     `json:"role"`
	ImageName     string     `json:"image_name"`
	ImagePath     string     `json:"image_path"`
	Address       []*Address `json:"addresses"`
	CreatedAt     string     `json:"created_at"`
	UpdatedAt     string     `json:"updated_at"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type Cart struct {
	ID         string  `json:"id"`
	ProductID  string  `json:"product_id"`
	Price      float64 `json:"price"`
	Quantity   int64   `json:"quantity"`
	TotalPrice float64 `json:"total_price"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
}
