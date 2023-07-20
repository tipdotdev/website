package database

import (
	"log"
	"os"

	"github.com/dickeyy/tip-dev/api/config"
	"github.com/dickeyy/tip-dev/api/models"
	"github.com/dickeyy/tip-dev/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// database instance
type Dbinstance struct {
	Db *gorm.DB
}

var DB Dbinstance

// connect to database
func Connect() {

	// get the connection string from .env
	dsn := config.Config("DSN")

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database \n", err)
		os.Exit(2)
	}

	log.Println("Connected to database")

	db.Logger = logger.Default.LogMode(logger.Info)

	log.Println("running migrations")
	db.AutoMigrate(&models.User{})

	DB = Dbinstance{
		Db: db,
	}

}
