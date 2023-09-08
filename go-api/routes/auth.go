package routes

import (
	"github.com/dickeyy/tip-dev/api/models"
	"github.com/dickeyy/tip-dev/api/services"
	"github.com/gofiber/fiber/v2"
)

// register a new user
func Register(c *fiber.Ctx) error {
	// create a new user struct
	user := new(models.NewUser)

	// parse body into user struct
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"message": "error parsing body",
		})
	}

	// check if user exists
	if services.CheckIfUserExists(user.Email) {
		return c.Status(400).JSON(&fiber.Map{
			"message": "user already exists",
		})
	}

	// create user
	services.CreateUser(user)

	// generate jwt
	token := services.GenerateJWT(user.ID)

	// return token
	return c.Status(200).JSON(&fiber.Map{
		"token": token,
	})

}
