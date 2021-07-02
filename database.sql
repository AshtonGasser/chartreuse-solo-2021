CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "user_type" VARCHAR (6) DEFAULT 'user'
);
INSERT INTO "user" ("username", "password", "user_type")
VALUES ('admin', '$2a$10$SMygShuLha1Zvwc3Qs3XbucFlsfxBGed/PaROMXnvDtRuylj3A/2i', 'admin');



INSERT INTO "ingredients" ("name", "ingredient_type", "value", "description", "user_id" )
VALUES ('lemon juice', 'mixer', 'acid', 'fresh lemon juice strained is always best', 1),
('lime juice', 'mixer', 'acid', 'fresh lime juice strained is always best', 1),
('angostura bitters','enhancer','bitters','bitters are to cocktails as salt to food. they help improve and align flavor as well as bring their own', 1),
('orange bitters','enhancer','bitters', 'made from orange peels, cardamom, caraway seed, coriander, anise, burnt sugar', 1),
('simple syrup', 'sugar', 'sugar', '1 to 1 ratio of sugar and water', 1),
('rich syrup', 'sugar','sugar', '2 to 1 ratio of sugar and water', 1),
('egg white','texture','protein', 'Adding eggs to shaken drinks is a tradition that dates back more than a century. always buy the freshest eggs available'),
('campari','cordial','amaro-apéritif','Campari has a strong bittersweet flavor, with notes of orange peel, cherry, clove, and cinnamon. It`s one of the most bitter liqueurs used in modern drinks.', 1),
('sweet vermouth','cordial','fortified-wine', 'aromatized fortified wine, flavoured with various botanicals (roots, barks, flowers, seeds, herbs, and spices) and sometimes colored. always keep refridgerated after opening', 1),
('dry vermouth','cordial','fortified-wine','also known as white vermouth or French vermouth. It is often clear or very pale yellow in color. The name "dry" signifies its flavor profile and it often contains just 5 percentsugar', 1),
('gin', 'spirit','spirit', 'Gin is a distilled alcoholic drink that derives its predominant flavour from juniper berries', 1),
('vodka','spirit','spirit','Vodka is a clear distilled alcoholic beverage from Europe. It has different varieties originating in Poland, Russia and Sweden. It is composed primarily of water and ethanol', 1),
('whiskey','spirit','spirit', ' whiskey is a type of distilled alcoholic beverage made from fermented grain mash. Various grains (which may be malted) are used for different varieties, including barley, corn, rye, and wheat. Whiskey is typically aged in wooden casks', 1),
('bourbon','spirit', 'whiskey', ' American whiskey, a barrel-aged distilled liquor made primarily from corn. distilled in Kentucky Bourbon', 1),
('rye', 'spirit', 'whiskey', 'rye mash used in rye whiskey has a spicy tone and dry taste', 1),
('irish whiskey', 'spirit', 'whiskey', 'made with a blend of malted and unmalted barley in the pot still phase', 1),
('scotch','spirit', 'whiskey',' Malt whisky or grain whisky (or a blend of the two), made in Scotland. All Scotch whisky must be aged in oak barrels for at least three years', 1),
('aquafaba','texture','protein','the viscous water in which legume seeds such as chickpeas have been cooked, mimics functional properties of eggwhites. a great vegan option ', 1),
('rum','spirit', 'spirit', 'made by fermenting then distilling sugarcane molasses or sugarcane juice. The distillate, a clear liquid, is usually aged in oak barrels', 1),
('soda','mixer','bubbles', 'carbonated water', 1),
('ginger beer', 'mixer', 'bubbles', 'Traditional ginger beer is a sweetened and carbonated, usually non-alcoholic beverage. It is produced by the natural fermentation of prepared ginger spice, yeast and sugar.', 1);

INSERT INTO "ingredients" ("name", "ingredient_type", "value", "user_id")
VALUES ('lemon twist', 'garnish', 'aromatic', 1),
('ice', 'ice', 'ice', 1)
('orange twist', 'garnish', 'aromatic', 1),
('flamed orange', 'garnish', 'aromatic', 1),
('lemon wheel', 'garnish', 'aromatic', 1),
('dehydrated lemon wheel', 'garnish', 'edible', 1),
('cherry', 'garnish', 'edible', 1),
('luxardo cherry', 'garnish', 'edible', 1),
('brandied cherry', 'garnish', 'edible', 1),
('cucumber', 'garnish', 'edible', 1),
('mint', 'garnish', 'aromatic', 1),
('basil', 'garnish', 'aromatic', 1),
('rosemary', 'garnish', 'aromatic', 1),
('lime wheel', 'garnish', 'decorative', 1),
('hotel ice', 'ice', 'ice', 1),
('crushed ice', 'ice', 'ice', 1),
('large ice cube', 'ice', 'ice', 1),
('large ice sphere', 'ice', 'ice', 1),
('olive', 'garnish', 'edible', 1),
('blue cheese olive', 'garnish', 'edible', 1);




CREATE TABLE "cocktails" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"description" varchar(300) ,
	"instructions" varchar(500) ,
	"glassware_id" int REFERENCES "glassware" NOT NULL,
	"created" DATE NOT NULL DEFAULT NOW(),
	"user_id" int REFERENCES "user" NOT NULL
);
--5ml = 1 barspoon. 
CREATE TYPE measurement_type AS ENUM('ounces', 'ml', 'dash');
CREATE TABLE "cocktails_ingredients" (
	"id" serial PRIMARY KEY,
	"cocktail_id" INT REFERENCES "cocktails" ON DELETE CASCADE NOT NULL,
	"ingredient_id" INT REFERENCES "ingredients" ON DELETE CASCADE NOT NULL,
	"measurement_type" varchar(255) NOT NULL,
	"number" DECIMAL NOT NULL
);
CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY, 
	"name" varchar(120) NOT NULL,
	"ingredient_type" varchar(255) NOT NULL,
	"value" TEXT ,
	"description" varchar(500) NULL,
	"created" DATE NULL DEFAULT NOW(),
	"user_id" int REFERENCES "user" NOT NULL
	
);

CREATE TABLE "glassware" (
	"id" serial PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
	"glass_type" TEXT NOT NULL,
	"glass_volume" DECIMAL NOT NULL,
	"description" varchar(500) NULL
);

INSERT INTO "glassware" ("name", "glass_type", "glass_volume")
VALUES ('martini', 'martini', 10.0);

INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('nick and nora', 'nick and nora', 6.0, 'Named after Nick and Nora Charles, a fictional couple created by Dashiell Hammett in his novel The Thin Man. Nick is an alcoholic private detective married to Nora, a wealthy Nob Hill heiress. The film portrays the glamorous couple enjoying 1930s cocktail culture.' );

INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Highball', 'Highball', 12.0, 'This tall straight glass holds about 8 to 12 ounces and is meant to be filled with ice. Best used for cocktails served on the rocks, the glass shape keeps the drink cold and preserves carbonation. Often used interchangeably with a Collins glass, the traditional highball glass is slightly shorter and wider than a Collins glass.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Collins Glass', 'Highball', 14.0, 'Sometimes referred to as a highball glass, the Collins glass is actually taller, narrower, and has a slightly larger capacity at 10 to 14 ounces. This tall glass keeps your cocktails chilled and is best used for drinks that are diluted with a lot of ice and contain more than one mixer. The Collins glass is named for the Tom Collins cocktail, but can be used for any cocktail over ice.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Zombie Glass', 'Highball',16.0 ,'This glass was originally designed to hold the Zombie cocktail, a blend of juices, rum, and liqueur. The zombie glass is the tallest and most narrow of all the cocktail glasses, which helps to highlight colorful drinks. Its large capacity is meant to hold cocktails that are made with several mixers.');
INSERT INTO "glassware" ("name", "glass_type", "glass_volume", "description")
VALUES ('Rocks Glass','lowball',10.0 ,'Also called an old fashioned or lowball glass, the rocks glass is short and wide with a sturdy bottom. Unlike the glasses above, which are designed to hold large amounts of ice and mixers, the rocks glass holds drinks made with mostly spirits. It`s named for the classic cocktail, the Old Fashioned, which contains bourbon whiskey with a couple dashes of Angostura bitters. The shape of the glass allows for muddling ingredients, stirring, and adding a large cube of ice or two.');

