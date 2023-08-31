package services

import (
	"context"
	"os"

	"github.com/redis/go-redis/v9"
)

var (
	Redis *redis.Client
)

func init() {
	client := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST"),
		Password: os.Getenv("REDIS_PASSWORD"),
	})

	err := client.Ping(context.Background()).Err()
	if err != nil {
		print(err)
		panic(err)
	}

	Redis = client
}
