CREATE TABLE IF NOT EXISTS "users" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean NOT NULL,
	"password" varchar(255),
	"created_at" bigint NOT NULL,
	"updated_at" bigint NOT NULL,
	"last_login" bigint NOT NULL,
	"name" varchar(255),
	"website" varchar(255),
	"bio" varchar(255),
	"page" json NOT NULL,
	"pictures" json DEFAULT '{"avatar":"","banner":""}'::json NOT NULL,
	"socials" json,
	"stripe" json,
	"oauth" json
);
