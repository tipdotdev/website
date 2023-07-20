package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// config function to get env value from key parameter
func Config(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	// check if there is an error
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	// return the env value
	return os.Getenv(key)

}
