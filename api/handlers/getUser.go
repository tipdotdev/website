package handlers

import (
	"net/http"

	"github.com/dickeyy/tip-dev/api/models"
	"github.com/gofiber/fiber/v2"

	"github.com/dickeyy/tip-dev/api/services"
)

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
