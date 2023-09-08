package services

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func GenerateJWT(userId string) string {

	// Create the Claims
	claims := jwt.MapClaims{
		"name":  userId,
		"admin": true,
		"exp":   time.Now().Add(time.Hour * 730).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		log.Fatal(err)
	}

	return t
}

// make a function to verify the token
func verifyToken() {
	// get the token from the header
	// split the token from the bearer
	// verify the token
	// if there is an error, return the error
	// if there is no error, return the token
}

func Restricted(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)
	return c.SendString("Welcome " + name)
}
