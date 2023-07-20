package main

import (
	"github.com/dickeyy/tip-dev/api/database"
	"github.com/dickeyy/tip-dev/api/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/lib/pq"
)

func main() {

	// connect to database
	database.Connect()

	// create new fiber instance
	app := fiber.New()

	// setup middleware
	app.Use(cors.New())
	app.Use(logger.New())

	// setup routes
	router.SetupRoutes(app)

	// handle 404
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})

	// listen to port 8080
	app.Listen(":8080")
}
