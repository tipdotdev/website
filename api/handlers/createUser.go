package handlers

import (
	"net/http"

	"github.com/dickeyy/tip-dev/api/models"
	"github.com/gofiber/fiber/v2"

	"github.com/dickeyy/tip-dev/api/services"
)

type createUserRequest models.User

func CreateUser(c *fiber.Ctx) error {
	req := &createUserRequest{}

	if err := c.BodyParser(req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	user := models.User{
		FirstName:       req.FirstName,
		Email:           req.Email,
		Website:         req.Website,
		Username:        req.Username,
		UserID:          req.UserID,
		Pfp:             req.Pfp,
		Bio:             req.Bio,
		Socials:         req.Socials,
		LastName:        req.LastName,
		ClerkCreatedAt:  req.ClerkCreatedAt,
		ClerkUpdatedAt:  req.ClerkUpdatedAt,
		StripeAccountID: req.StripeAccountID,
	}

	services.DB.Create(&user)

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"user": user,
	})
}
