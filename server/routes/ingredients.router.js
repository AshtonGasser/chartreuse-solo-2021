const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("got to ingredients.get");
  const query = `SELECT * FROM "ingredients"`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR in ingredient.router GET -> ", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
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
      req.body.user_id,
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
