const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET Routes⬇
router.get("/", rejectUnauthenticated, async (req, res) => {
  let queryText = `SELECT * FROM "cocktails"
  WHERE "user_id" = $1`;
  try {
    const result = await pool.query(queryText, [req.user.id]);
    res.send(result.rows);
  } catch (error) {
    console.error(error, "in cocktail get");
    res.sendStatus(500);
  }
});

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const cocktail_ID = req.params.id;
  console.log("got to cocktails.router");
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
});  //end get routes

// POST ROUTES⬇

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("cocktail we are posting", req.body);
  // FIRST QUERY MAKES NEW COCKTAIL
  //const { name, description, instructions, glassware_id } = req.body;

  const queryText = `INSERT INTO "cocktails" ("name", "description", "instructions", "glassware_id", "user_id" )
    VALUES ($1, $2, $3, $4, $5 )
    RETURNING id;`;
  const values = [
    req.body.myName,
    req.body.myDescription,
    req.body.myInstructions,
    req.body.glassware_id,
    req.user.id,
  ];
  pool
    .query(queryText, values)
    .then((result) => {
      console.log("Cocktail Id:", result.rows[0].id);
      //SECOND QUERY ADDS COCKTAILS & INGREDIENTS FOR COCKTAILS-INGREDIENTS
      //const { cocktail_id, ingredient_id, measurement_type, number } = req.body;
      const insertCocktailQuery = `
       INSERT INTO "cocktails_ingredients" ("cocktail_id", "ingredient_id", "measurement_type", "number")
       VALUES ($1, $2, $3, $4) 
       ;`;
      const ingredientArray = [];
      for (let i = 0; i < req.body.myIngredients.length; i++) {
        const joinValues = [
          result.rows[0].id,
          req.body.myIngredients[i].id,
          req.body.myIngredients[i].measurement_type,
          req.body.myIngredients[i].quantity,
        ];
        ingredientArray.push(pool.query(insertCocktailQuery, joinValues));
      }
      //Catch for the first query
      Promise.all(ingredientArray)
        .then((response) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(`${err} in Post`);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`oh no there is an ${err} in cocktail POST`);
      res.sendStatus(500);
    });
}); //END POST ROUTES

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
