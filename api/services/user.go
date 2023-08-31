package services

import (
	"context"

	"github.com/dickeyy/tip-dev/api/models"
)

func CheckIfUserExists(email string) bool {
	_, err := Redis.GetSet(context.Background(), "tdev-users", email).Result()
	if err == nil {
		return true
	}
	return false
}

func CreateUser(user *models.NewUser) {
	_, err := Redis.SAdd(context.Background(), "tdev-users", user.Email).Result()

	if err != nil {
		panic(err)
	}
}
