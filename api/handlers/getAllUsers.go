package handlers

import (
	"net/http"

	"github.com/dickeyy/tip-dev/api/models"
	"github.com/gofiber/fiber/v2"

	"github.com/dickeyy/tip-dev/api/services"
)

func GetAllUsers(c *fiber.Ctx) error {

	var users []models.User

	services.DB.Find(&users)

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"users": users,
	})
}
