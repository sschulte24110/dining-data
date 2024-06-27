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
  "out_of_stock" boolean NOT NULL DEFAULT false,
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
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"deleted" boolean NOT NULL DEFAULT false,
  "out_of_stock" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk3" FOREIGN KEY ("beer_style") REFERENCES "beer_style"("id");

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk7" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id");

ALTER TABLE "beers" ADD CONSTRAINT "beers_fk9" FOREIGN KEY ("user_id") REFERENCES "user"("id");

INSERT INTO "wine_varietal" ("wine_varietal")
VALUES
('Bordeaux'),
('Cabernet Sauvignon'),
('Italian Gems'),
('Malbec'), 
('Merlot'),
('Pinot Noir'),
('Red Blends'),
('Syrah and Shiraz'),
('Zinfandel'),
('Other Reds'),
('Aromatic, Sweet and Blends'),
('Chardonnay'),
('Pinot Grigio and Pinot Gris'),
('Sauvignon Blanc'),
('Sparkling and Champagne'),
('Other Whites');

INSERT INTO "beer_style" ("beer_style")
VALUES
('Ale - IPA - Pale Ale - Hoppy'),
('Amber - Malty - Smooth'),
('Blonde - Cream Ale - Golden'),
('Cider'), 
('Fruit Beer'),
('Lager - Pilsner'),
('Light - Domestic'),
('Porter - Stout'),
('Sour'),
('Wheat - Hefeweizen'),
('Other Beer Style');

INSERT INTO "vendors" ("vendor_name", "contact_person_name", "phone_number", "address", "city", "state", "zip_code", "email")
VALUES
('Breakthru Beverages', 'Joel Smith', '6515557788', '98724 Union Ave', 'Minneapolis', 'MN', '55454', 'joelsmith@breakthru.com'),
('Johnson Brothers', 'Sue Murray', '2182348888', '3245 Snelling Ave', 'St Paul', 'MN', '55489', 'sueM@jbros.com'),
('Bergseth Brothers', 'Ryan Jackson', '7013061111', '1211 47th Ave N', 'Fargo', 'ND', '58102', 'rjackson@bergsethbrothers.com');

INSERT INTO "beers" ("name", "brewery", "beer_style", "abv", "photo_url", "description", "vendor_id", "user_id")
VALUES
('Two Hearted', 'Bells', 1, 7.00, null, 'Perfectly balanced with a malt backbone and combined with the signature fruity aromas of Bells house yeast, this beer is remarkably drinkable and well suited for adventures everywhere', 2, 1),
('Surly Lemonade', 'Surly', 5, 5.50, null, 'Slightly tart with balanced sweetness, Surly Lemonade squeezes fresh flavor into every single drop. Bright, crisp, and lemony, this incredibly drinkable ale quenches and refreshes', 1, 1);

INSERT INTO "wines" ("name_winery", "wine_varietal_id", "region", "year", "photo_url", "description", "vendor_id", "user_id")
VALUES
('Chateau Mondesir', 1, 'Cotes De Blaye', '2019', null, 'Crisp, tangy and fresh, this bright, fruity wine has good acidity. Freshly squeezed lemon flavors add a lively, zesty aftertaste', 3, 1),
('Bonanza', 2, 'California', '2019', null, 'CFeatures flavors of luscious fruit, dark chocolate and silky tannins', 1, 1);