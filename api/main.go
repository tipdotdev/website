package main

import (
	"os"

	"github.com/dickeyy/tip-dev/api/routes"
	"github.com/dickeyy/tip-dev/api/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	jwtware "github.com/gofiber/contrib/jwt"
)

func main() {

	// make a new fiber instance
	api := fiber.New(fiber.Config{
		AppName:      "tipdev-api",
		ServerHeader: "Fiber",
	})

	// connect to database
	services.ConnectDatabase()

	// setup middleware
	api.Use(logger.New())
	api.Use(cors.New())

	// auth routes
	api.Post("/auth/register", routes.Register)

	// jwt
	api.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(os.Getenv("JWT_KEY"))},
	}))

	// setup routes
	api.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(&fiber.Map{
			"message": "are you lost? if not come work for us! email hello@tip.dev",
		})
	})

	// users routes
	api.Post("/users", routes.CreateUser)
	api.Get("/users", routes.GetAllUsers)
	api.Get("/users/:id", routes.GetUser)

	// newsletter routes
	api.Post("/newsletter/enter", routes.EnterNewsletter)
	api.Get("/newsletter", routes.GetNewsletter, services.Restricted)
	api.Delete("/newsletter/delete", routes.DeleteNewsletter)

	// listen on port 8080
	api.Listen(":443")

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjk1OTcwNjY2LCJuYW1lIjoiIn0.I7Mih2G8zKum-71SAznTNWLUNXCCJfwJEgGDsTWyGFc
