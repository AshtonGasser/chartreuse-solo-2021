const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET Route⬇

//post id + user_id
router.get("/cocktails/:id", rejectUnauthenticated, (req, res) => {
  //console.log('this is our cocktail; request:', req.user);
  const cocktail_ID = req.params.id;
  console.log("got to cocktails.router");
  //let myCocktailId = req.query.id
  let myQuery = `SELECT "cocktails".name AS "cocktail", string_agg( "ingredients".name, ', ')
   AS "ingredients", string_agg("cocktails_ingredients".measurement_type, ', ')
   AS "measurement", array_agg("cocktails_ingredients".number) FROM "cocktails"
  JOIN "cocktails_ingredients" ON "cocktails".id = "cocktails_ingredients".cocktail_id
  JOIN "ingredients" ON  "cocktails_ingredients".ingredient_id = "ingredients".id
  WHERE "cocktails".id = $1
  GROUP BY cocktails.id;`;

  pool
    .query(myQuery, cocktail_ID)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /cocktails", error);
      res.sendStatus(500);
    });
}); //end get routes

// POST ROUTES⬇

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("cocktail we are posting", req.body);
  // FIRST QUERY MAKES NEW COCKTAIL
  const { name, description, instructions, ingredients, glass } = req.body;
  const { user_id } = req.user.id;
  let queryText = `INSERT INTO "cocktails" (name, description, instructions, ingredients, glassware_id, user_id )
    VALUES ($1, $2, $3, $4, $5, $6);`;
  const values = [name, description, instructions, ingredients, glass];
  const id = [user_id];
  pool
    .query(queryText, values, id)
    .then((result) => {
      console.log("Cocktail Id:", result.rows);
      //SECOND QUERY ADDS COCKTAILS & INGREDIENTS FOR COCKTAILS-INGREDIENTS
      const { cocktail_id, ingredient_id, measurement_type, number } = req.body;
      const values = [cocktail_id, ingredient_id, measurement_type, number];
      const insertCocktailQuery = `
       INSERT INTO "cocktails_ingredients" ("cocktail_id", "ingredient_id", "measurement_type", "number")
       VALUES ($1, $2, $3, $4,) 
       ;`;
      pool.query(insertCocktailQuery, values);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`oh no there is in ${err} in POST`);
      res.sendStatus(500);
    });
}); //end get routes

//DELETE Route⬇
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in router.delete");
  const cocktailToDelete = req.params.id;
  const query = `DELETE FROM "cocktails_ingredients" WHERE "user_id" = $1 AND "cocktails".id = $2 IN   > 1 "`;
  pool
    .query(query, [req.user.id, cocktailToDelete])
    .then((response) => {
      console.log(`we deleted cocktail with id ${cocktailToDelete}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("something went wrong in cocktailRouter.delete", err);
      res.sendStatus(500);
    });
}); //end cocktail/Router.delete

module.exports = router;
