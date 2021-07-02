const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
//get
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log('this is our ingredient request:', req.user);
  console.log("got to ingredients.get");
  const query = `SELECT * FROM "ingredients"
  WHERE "user_id" = $1 or "user_id" = 1`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR in ingredient.router GET -> ", err);
      res.sendStatus(500);
    });
});
    //post
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log('this is what we are posting');

  const insertIngredientQuery = `
  INSERT INTO "ingredients" ("name", "ingredient_type", "value", "description", "user_id")
  VALUES ($1, $2, $3, $4, $5)
  ;`;
  //const ingredientId = result.rows[0].id
  // FIRST QUERY MAKES NEW INGREDIENT
  pool
    .query(insertIngredientQuery, [
      req.body.name,
      req.body.ingredient_type,
      req.body.value,
      req.body.description,
      req.user.id,
    ])
    .then((result) => {
      console.log("ingredients Id:", result.rows); 
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log(`adding ingredients ${err} `);
      res.sendStatus(500);
    });
});

//DELETE
router.delete('/ingredients/:id',rejectUnauthenticated, (req, res) => {
  console.log('in router.delete');
    const ingredientToDelete = req.params.id
    //const queryText = `DELETE FROM "ingredients" WHERE "ingredients".id =$1`
    const query = `DELETE FROM "ingredients" WHERE "user_id" = $1 AND "ingredients".id = $2 IN (SELECT "id" from )  > 1 "`
    pool
    .query(query, [req.user.id, ingredientToDelete, ])
    .then((response) => {
        console.log(`we deleted an ingredient with id ${ingredientToDelete}`);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("something went wrong in ingredientRouter.delete", err);
        res.sendStatus(500);
      });
  }); //end toDo/Router.delete


//delete map 
// router.delete('/:id',rejectUnauthenticated, (req, res) => {
//     console.log('in delete');
//     let index = 0;
//     // loop over all the items in the basket
//     for (const ingredients of ingredients) {
//         // check to see if the id matches
//         if (req.params.id == ingredient.id) {
//             // found the item, remove it from the array
//             ingredient.splice(index, 1);
//             break;
//         }
//         index += 1;
//     }
//     res.sendStatus(200);
// });

module.exports = router;
