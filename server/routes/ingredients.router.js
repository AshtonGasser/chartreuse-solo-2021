const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

module.exports = router;
