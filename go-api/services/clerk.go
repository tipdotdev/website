package services

import (
	"os"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

var Clerk clerk.Client

// ConnectClerk connects to Clerk
func ConnectClerk() {
	client, err := clerk.NewClient(os.Getenv("CLERK_SECRET_KEY"))

	if err != nil {
		panic(err)
	}

	Clerk = client
}
