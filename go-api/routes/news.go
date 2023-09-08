package routes

import (
	"context"
	"strings"

	"github.com/dickeyy/tip-dev/api/services"
	"github.com/dickeyy/tip-dev/api/utils"
	"github.com/gofiber/fiber/v2"
)

// enter email into newsletter
func EnterNewsletter(c *fiber.Ctx) error {
	type request struct {
		EmailAddress string `json:"email_address"`
	}

	input := new(request)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(400)
	}

	invalid := utils.Validate(input)
	if invalid == "EmailAddress" {
		return c.Status(400).JSON(&fiber.Map{
			"message": "Invalid email address",
		})
	}

	input.EmailAddress = strings.TrimSpace(input.EmailAddress)
	input.EmailAddress = strings.ToLower(input.EmailAddress)

	res := services.Redis.SAdd(context.Background(), "tdev-newsletter", input.EmailAddress).Val()
	if res == 0 {
		return c.Status(400).JSON(&fiber.Map{
			"message": "Email already exists",
		})
	}

	return c.Status(200).JSON(&fiber.Map{
		"message": "success",
	})
}

// get all emails from newsletter
func GetNewsletter(c *fiber.Ctx) error {
	// get all emails from redis
	emails := services.Redis.SMembers(context.Background(), "tdev-newsletter").Val()

	return c.Status(200).JSON(&fiber.Map{
		"emails": emails,
	})
}

// delete an email from newsletter
func DeleteNewsletter(c *fiber.Ctx) error {
	type request struct {
		EmailAddress string `json:"email_address"`
	}

	input := new(request)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(400)
	}

	invalid := utils.Validate(input)
	if invalid == "EmailAddress" {
		return c.Status(400).JSON(&fiber.Map{
			"message": "Invalid email address",
		})
	}

	input.EmailAddress = strings.TrimSpace(input.EmailAddress)
	input.EmailAddress = strings.ToLower(input.EmailAddress)

	res := services.Redis.SRem(context.Background(), "tdev-newsletter", input.EmailAddress).Val()
	if res == 0 {
		return c.Status(400).JSON(&fiber.Map{
			"message": "Email does not exist",
		})
	}

	return c.Status(200).JSON(&fiber.Map{
		"message": "success",
	})
}
