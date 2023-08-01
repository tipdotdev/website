package main

import (
	"github.com/dickeyy/tip-dev/api/routes"
	"github.com/dickeyy/tip-dev/api/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	// make a new fiber instance
	api := fiber.New(fiber.Config{
		AppName:      "tip.dev-api",
		ServerHeader: "Fiber",
	})

	// connect to database
	services.ConnectDatabase()

	// setup middleware
	api.Use(logger.New())
	api.Use(cors.New())

	// setup routes
	api.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(&fiber.Map{
			"message": "Hello, World!",
		})
	})

	// users routes
	api.Post("/users", routes.CreateUser)
	api.Get("/users", routes.GetAllUsers)
	api.Get("/users/:id", routes.GetUser)

	// newsletter routes
	api.Post("/newsletter/enter", routes.EnterNewsletter)
	api.Get("/newsletter", routes.GetNewsletter)
	api.Delete("/newsletter/delete", routes.DeleteNewsletter)

	// listen on port 8080
	api.Listen(":80")

}
