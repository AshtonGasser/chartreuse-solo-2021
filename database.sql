
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--create database chartreuse
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);




CREATE TABLE "ingredients" (
	"id" serial NOT NULL,
	"name" varchar(120) NOT NULL,
	"ingredient_type" varchar(255) NOT NULL,
	"value" TEXT NOT NULL,
	"description" varchar(500) NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "cocktails" (
	"id" serial NOT NULL,
	"name" varchar(120) NOT NULL,
	"description" varchar(300) NOT NULL,
	"instructions" varchar(500) NOT NULL,
	"ingredient" TEXT NOT NULL,
	"user_id" int NOT NULL,
	"glass" int NOT NULL,
	CONSTRAINT "cocktails_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
--5ml = 1 barspoon. 
CREATE TYPE measurement_type AS ENUM('ounces', 'ml', 'dash');
CREATE TABLE "cocktails_ingredients" (
	"id" serial NOT NULL,
	"cocktail_id" INT REFERENCES "cocktails" ON DELETE CASCADE NOT NULL,
	"ingredient_id" INT REFERENCES "ingredients" ON DELETE CASCADE NOT NULL,
	"measurement_type" varchar(255) NOT NULL,
	"number" DECIMAL NOT NULL,
	CONSTRAINT "cocktails_ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "glassware" (
	"id" serial NOT NULL,
	"name" VARCHAR(80) NOT NULL,
	"glass_type" TEXT NOT NULL,
	"glass_volume" DECIMAL NOT NULL,
	"description" varchar(500) NOT NULL,
	CONSTRAINT "glassware_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Highball', 'Highball', 12.0, 'This tall straight glass holds about 8 to 12 ounces and is meant to be filled with ice. Best used for cocktails served on the rocks, the glass shape keeps the drink cold and preserves carbonation. Often used interchangeably with a Collins glass, the traditional highball glass is slightly shorter and wider than a Collins glass.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Collins Glass', 'Highball', 14.0, 'Sometimes referred to as a highball glass, the Collins glass is actually taller, narrower, and has a slightly larger capacity at 10 to 14 ounces. This tall glass keeps your cocktails chilled and is best used for drinks that are diluted with a lot of ice and contain more than one mixer. The Collins glass is named for the Tom Collins cocktail, but can be used for any cocktail over ice.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Zombie Glass', 'Highball',16.0 ,'This glass was originally designed to hold the Zombie cocktail, a blend of juices, rum, and liqueur. The zombie glass is the tallest and most narrow of all the cocktail glasses, which helps to highlight colorful drinks. Its large capacity is meant to hold cocktails that are made with several mixers.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Rocks Glass','lowball',10.0 ,'Also called an old fashioned or lowball glass, the rocks glass is short and wide with a sturdy bottom. Unlike the glasses above, which are designed to hold large amounts of ice and mixers, the rocks glass holds drinks made with mostly spirits. It`s named for the classic cocktail, the Old Fashioned, which contains bourbon whiskey with a couple dashes of Angostura bitters. The shape of the glass allows for muddling ingredients, stirring, and adding a large cube of ice or two.');