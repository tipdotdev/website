package main

import (
	"github.com/dickeyy/tip-dev/api/handlers"
	"github.com/dickeyy/tip-dev/api/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	// make a new fiber instance
	app := fiber.New(fiber.Config{
		AppName:      "tip.dev-api",
		ServerHeader: "Fiber",
	})

	// connect to database
	services.ConnectDatabase()

	// setup middleware
	app.Use(logger.New())

	// setup routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// users routes
	app.Post("/users", handlers.CreateUser)
	app.Get("/users", handlers.GetAllUsers)
	app.Get("/users/:id", handlers.GetUser)

	// listen on port 8080
	app.Listen(":8080")

}
