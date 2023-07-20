package handler

import (
	"github.com/dickeyy/tip-dev/api/database"
	"github.com/dickeyy/tip-dev/api/models"
	"github.com/gofiber/fiber/v2"
)

// create new user
func CreateUser(c *fiber.Ctx) error {

	// create new user instance
	user := models.User{}

	// parse body into user instance
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	// create user
	database.DB.Db.Create(&user)

	// return user
	return c.JSON(user)

}

// get all users
func GetAllUsers(c *fiber.Ctx) error {

	// get all users
	var users []models.User
	database.DB.Db.Find(&users)

	// return users
	return c.JSON(users)

}

// get user
func GetUser(c *fiber.Ctx) error {

	// get id param
	id := c.Params("id")

	// get user
	var user models.User
	database.DB.Db.Find(&user, id)

	// return user
	return c.JSON(user)

}

// update user
func UpdateUser(c *fiber.Ctx) error {

	// get id param
	id := c.Params("id")

	// get user
	var user models.User
	database.DB.Db.Find(&user, id)

	// parse body into user instance
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	// update user
	database.DB.Db.Save(&user)

	// return user
	return c.JSON(user)

}

// delete user
func DeleteUser(c *fiber.Ctx) error {

	// get id param
	id := c.Params("id")

	// get user
	var user models.User
	database.DB.Db.Find(&user, id)

	// delete user
	database.DB.Db.Delete(&user)

	// return success message
	return c.SendString("User successfully deleted")

}
