package models

import (
	"gorm.io/gorm"
)

// User model
type User struct {
	gorm.Model

	id                string "json:id"
	email             string "json:email"
	pfp               string "json:pfp"
	bio               string "json:bio"
	website           string "json:website"
	socials           string "json:socials"
	first_name        string "json:first_name"
	last_name         string "json:last_name"
	created_at        string "json:created_at"
	updated_at        string "json:updated_at"
	stripe_account_id string "json:stripe_account_id"
	account_number    string "json:account_number"
}

// users struct
type Users struct {
	Users []User `json:"users"`
}
