package routes

import (
	"net/http"

	"github.com/dickeyy/tip-dev/api/models"
	"github.com/gofiber/fiber/v2"

	"github.com/dickeyy/tip-dev/api/services"
)

type createUserRequest models.User

func GetUser(c *fiber.Ctx) error {
	var user models.User

	if err := services.DB.First(&user, "id = ?", c.Params("id")).Error; err != nil {
		return c.Status(http.StatusNotFound).JSON(&fiber.Map{
			"message": "User not found!",
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"user": user,
	})
}

func GetAllUsers(c *fiber.Ctx) error {

	var users []models.User

	services.DB.Find(&users)

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"users": users,
	})
}

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
