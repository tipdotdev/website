package services

import (
	"os"

	"github.com/dickeyy/tip-dev/api/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := os.Getenv("DATABASE_CONNECTION_URL")
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	// Migrate the users table
	database.AutoMigrate(&models.User{})
	DB = database
}
