const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET Routes⬇ might use¸¸¸
// router.get("/", rejectUnauthenticated, async (req, res) => {
//   let queryText = `SELECT * FROM "cocktails"
//   WHERE "user_id" = $1`;
//   try {
//     const result = await pool.query(queryText, [req.user.id]);
//     res.send(result.rows);
//   } catch (error) {
//     console.error(error, "in cocktail get");
//     res.sendStatus(500);
//   }
// });

router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("got to cocktails.router");
  let myQuery = `SELECT "cocktails".* , JSON_AGG (JSON_BUILD_OBJECT(
    'id', "ingredients".id, 'name', "ingredients".name, 'ingredient_type', "ingredients".ingredient_type, 'quality', "ingredients".quality, 'user_id', "ingredients".user_id,
  'measurement_type', "cocktails_ingredients".measurement_type, 'number', "cocktails_ingredients".number )
 ) AS "ingredients" FROM "cocktails"
 JOIN "cocktails_ingredients" ON "cocktails".id = "cocktails_ingredients".cocktail_id
 JOIN "ingredients" ON  "cocktails_ingredients".ingredient_id = "ingredients".id
 WHERE "cocktails".user_id = $1 or "cocktails".user_id = 1
 GROUP BY cocktails.id;
 `;

  pool
    .query(myQuery, [req.user.id])
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

  const queryText = `INSERT INTO "cocktails" ("name", "description", "instructions", "glassware_id", "user_id", "url", "rating")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;`;
  const values = [
    req.body.myName,
    req.body.myDescription,
    req.body.myInstructions,
    req.body.glassware_id,
    req.user.id,
    req.body.url,
    req.body.rating,
  ];
  pool
    .query(queryText, values)
    .then((result) => {
      console.log("Cocktail Id:", result.rows[0].id);
      //SECOND QUERY ADDS COCKTAILS & INGREDIENTS FOR COCKTAILS-INGREDIENTS
      const insertCocktailQuery = `
       INSERT INTO "cocktails_ingredients" ("cocktail_id", "ingredient_id", "measurement_type", "number" )
       VALUES ($1, $2, $3, $4 ) 
       ;`;
      const ingredientArray = [];
      for (let i = 0; i < req.body.myIngredients.length; i++) {
        const joinValues = [
          result.rows[0].id,
          req.body.myIngredients[i].id,
          req.body.myIngredients[i].measurement_type,
          req.body.myIngredients[i].number,
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

// PUT ROUTES⬇

router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`cocktail we are updating `, req.body);
  const values = [
    req.params.id,
    req.body.myName,
    req.body.myDescription,
    req.body.myInstructions,
    req.body.glassware_id,
    req.body.url,
    req.body.rating,
  ];

  let queryUpdate = `UPDATE "cocktails" SET "name" = $2, 
   "instructions" =$3, "description" =$4, "glassware_id"=$5, "url"=$7, "rating" = $8
   WHERE "cocktails".id =$1`;
  if (req.user.id != 1) {
    queryUpdate += ` AND user_id = $6;`;
    values.push(req.user.id);
  } else {
    queryUpdate += `;`;
  }
  let queryParams = [req.params.id];
  let query = `DELETE FROM "cocktails_ingredients" WHERE "cocktail_id" =$1 ;`;
  pool
    .query(query, queryParams)
    .then((response) => {
      console.log(`we deleted cocktail with ${req.params.id}`);
      pool.query(queryUpdate, values).then((result) => {
        console.log(`we updated ingredient with id`, req.body);
        const insertCocktailQuery = `
        INSERT INTO "cocktails_ingredients" ("cocktail_id", "ingredient_id", "measurement_type", "number" )
        VALUES ($1, $2, $3, $4 ) 
        ;`;
        const ingredientArray = [];
        for (let i = 0; i < req.body.myIngredients.length; i++) {
          const joinValues = [
            req.params.id,
            req.body.myIngredients[i].id,
            req.body.myIngredients[i].measurement_type,
            req.body.myIngredients[i].number,
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
      });
    })
    .catch((err) => {
      console.log("something went wrong in cocktailRouter.delete", err);
      res.sendStatus(500);
    });
}); //END PUT ROUTES

//DELETE Route⬇
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in router.delete");
  const cocktailToDelete = req.params.id;
  const id = req.user.id;
  const queryParams = [req.params.id, id];

  let query = `DELETE FROM "cocktails" WHERE "cocktails"."id" =$1 AND "user_id" = $2 `;
  pool
    .query(query, queryParams)
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
