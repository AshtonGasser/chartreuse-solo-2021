const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET Routes⬇
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
  let myQuery = `SELECT "cocktails".* , JSON_AGG (JSON_BUILD_OBJECT('id', "ingredients".id, 'name', "ingredients".name, 'ingredient_type', "ingredients".ingredient_type, 'quality', "ingredients".quality, 'user_id', "ingredients".user_id,
  'measurement_type', "cocktails_ingredients".measurement_type, 'number', "cocktails_ingredients".number)
 ) AS "ingredients" FROM "cocktails"
 JOIN "cocktails_ingredients" ON "cocktails".id = "cocktails_ingredients".cocktail_id
 JOIN "ingredients" ON  "cocktails_ingredients".ingredient_id = "ingredients".id
 WHERE "cocktails".user_id = $1
 GROUP BY cocktails.id;
 `;

  pool
    .query(myQuery, [req.user.id])
    .then((result) => {
      //console.log('what we are getting back from database', result.rows);
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

// PUT ROUTES⬇

router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`cocktail we are updating `, req.body);
  const values = [
    req.body.myName,
    req.body.myDescription,
    req.body.myInstructions,
    req.body.glassware_id,
    req.params.id,
  ];

  let queryUpdate = `UPDATE "cocktails" SET "name" = $1, 
   "instructions" =$2, "description" =$3, "glassware_id"=$4
   WHERE "cocktails".id =$5`;
  if (req.user.id != 1) {
    queryUpdate += ` AND user_id = $6;`;
    values.push(req.user.id);
  } else {
    queryUpdate += `;`;
  }
  pool.query(queryUpdate, values).then((result) => {
    console.log(`we updated ingredient with id`, req.params.id);
    const updateCocktailQuery = `
   UPDATE "cocktails_ingredients" SET
   "measurement_type" = $3, "number" = $4
   WHERE "cocktail_id"=$1 AND "ingredient_id" = $2;`;
    const updateIngredientArray = [];
    for (let i = 0; i < req.body.myIngredients.length; i++) {
      const joinUpdateValues = [
        req.params.id,
        req.body.myIngredients[i].id,
        req.body.myIngredients[i].measurement_type,
        req.body.myIngredients[i].quantity,
      ];
      updateIngredientArray.push(
        pool.query(updateCocktailQuery, joinUpdateValues)
      );
    }
    //catch for first update query
    Promise.all(updateIngredientArray)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error with the promise in put', err);
        res.sendStatus(500);
      });
  });
}); //END PUT ROUTES

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
