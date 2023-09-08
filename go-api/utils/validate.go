package utils

import (
	"github.com/go-playground/validator/v10"
)

var (
	validate = validator.New()
)

func Validate(s interface{}) (invalid string) {
	err := validate.Struct(s)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			invalid = err.Field()
			return
		}
	}
	return
}
