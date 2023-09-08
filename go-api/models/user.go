package models

import (
	"gorm.io/gorm"
)

// user struct
type User struct {
	gorm.Model

	FirstName       string `json:"first_name"`
	Email           string `json:"email"`
	Website         string `json:"website"`
	Username        string `json:"username"`
	UserID          string `json:"user_id"`
	Pfp             string `json:"pfp"`
	Bio             string `json:"bio"`
	Socials         string `json:"socials"`
	LastName        string `json:"last_name"`
	ClerkCreatedAt  string `json:"clerk_created_at"`
	ClerkUpdatedAt  string `json:"clerk_updated_at"`
	StripeAccountID string `json:"stripe_account_id"`
}

type NewUser struct {
	gorm.Model

	FirstName       string `json:"first_name"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	Website         string `json:"website"`
	Username        string `json:"username"`
	ID              string `json:"id"`
	Pfp             string `json:"pfp"`
	Bio             string `json:"bio"`
	Socials         string `json:"socials"`
	LastName        string `json:"last_name"`
	StripeAccountID string `json:"stripe_account_id"`
}
