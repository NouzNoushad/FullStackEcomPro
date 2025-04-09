package main

// valid status
func isValidStatus(status string) bool {
	switch status {
	case "published",
		"draft",
		"scheduled",
		"inactive":
		return true
	}
	return false
}

// valid category
func isValidCategory(category string) bool {
	switch category {
	case "computers",
		"watches",
		"headphones",
		"footwear",
		"cameras",
		"shirts",
		"household",
		"handbags",
		"wines",
		"sandals":
		return true
	}
	return false
}

// valid template
func isValidTemplate(template string) bool {
	switch template {
	case "default template",
		"electronics",
		"office stationary",
		"fashion":
		return true
	}
	return false
}

// valid discount type
func isValidDiscountType(discountType string) bool {
	switch discountType {
	case "no discount",
		"percentage",
		"fixed price":
		return true
	}
	return false
}

// valid tax class
func isValidTaxClass(taxClass string) bool {
	switch taxClass {
	case "tax free",
		"taxable goods",
		"downloadable product":
		return true
	}
	return false
}

// valid role
func isValidRole(role string) bool {
	switch role {
	case "customer",
		"admin",
		"seller":
		return true
	}
	return false
}
