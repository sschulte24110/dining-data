CREATE TABLE IF NOT EXISTS "user" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" varchar(255),
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin_status" boolean NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deleted" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "wine_varietal" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"wine_varietal" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "beer_style" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"beer_style" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "vendors" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"vendor_name" varchar(255) NOT NULL DEFAULT '255',
	"contact_person_name" varchar(255) NOT NULL DEFAULT '255',
	"phone_number" varchar(255) NOT NULL DEFAULT '255',
	"address" varchar(255) NOT NULL DEFAULT '255',
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip_code" bigint NOT NULL,
	"email" varchar(255) NOT NULL,
	"deleted" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "wines" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name_winery" varchar(255) NOT NULL,
	"wine_varietal_id" bigint NOT NULL,
	"region" varchar(255),
	"year" varchar(4),
	"photo_url" varchar(255) DEFAULT NULL,
	"description" varchar(255) NOT NULL,
	"vendor_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
	"deleted" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

ALTER TABLE "wines" ADD CONSTRAINT "wines_fk2" FOREIGN KEY ("wine_varietal_id") REFERENCES "wine_varietal"("id");

ALTER TABLE "wines" ADD CONSTRAINT "wines_fk7" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id");

ALTER TABLE "wines" ADD CONSTRAINT "wines_fk9" FOREIGN KEY ("user_id") REFERENCES "user"("id");

CREATE TABLE IF NOT EXISTS "beers" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"brewery" varchar(255) NOT NULL,
	"beer_style" bigint NOT NULL,
	"abv" numeric(10,2),
	"photo_url" varchar(255),
	"description" varchar(255) NOT NULL,
	"vendor_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"deleted" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk3" FOREIGN KEY ("beer_style") REFERENCES "beer_style"("id");

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk7" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id");

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk9" FOREIGN KEY ("user_id") REFERENCES "user"("id");

