package services

import (
	"github.com/dickeyy/tip-dev/api/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	dsn := "7dbjatcjfoa9f2w4lkis:pscale_pw_G4Mv1iJEJSYilSJLLBj7BggI65AaQHtljirkoKA9XkM@tcp(aws.connect.psdb.cloud)/maindb?tls=true"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	// Migrate the users table
	database.AutoMigrate(&models.User{})
	DB = database

}
