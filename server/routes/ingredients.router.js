const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET Route⬇
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("this is our ingredient request:", req.user);
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

//POST Route⬇
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("this is what we are posting");

  const insertIngredientQuery = `
  INSERT INTO "ingredients" ("name", "ingredient_type", "quality", "description", "user_id")
  VALUES ($1, $2, $3, $4, $5)
  ;`;
  //const ingredientId = result.rows[0].id
  // QUERY MAKES NEW INGREDIENT
  pool
    .query(insertIngredientQuery, [
      req.body.name,
      req.body.ingredient_type,
      req.body.quality,
      req.body.description,
      req.user.id,
    ])
    .then((result) => {
      console.log("ingredients Id:", result.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`adding ingredients ${err} `);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  //field , value = name , description
  const { field, value } = req.body;
  const params = [value, id];

  let query = `UPDATE "ingredients" SET ${field} = $1 WHERE id = $2`;
  if (req.user.id != 1) {
    query += ` AND user_id = $3`;
    params.push(req.user.id);
  }

  pool
    .query(query, params)
    .then((response) => {
      console.log(`we updated ingredient with id ${id}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("something went wrong in put.Router.updateIngredients", err);
      res.sendStatus(500);
    });
});

//DELETE Route⬇
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("in router.delete");
  const ingredientToDelete = req.params.id;
  //const queryText = `DELETE FROM "ingredients" WHERE "ingredients".id =$1`
  const query = `DELETE FROM "ingredients" WHERE "user_id" = $1 AND "ingredients".id = $2 IN > 1 "`;
  pool
    .query(query, [req.user.id, ingredientToDelete])
    .then((response) => {
      console.log(`we deleted an ingredient with id ${ingredientToDelete}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("something went wrong in ingredientRouter.delete", err);
      res.sendStatus(500);
    });
}); //end cocktail/Router.delete

// BULK DELETE  Route⬇
router.post("/delete-ingredients", rejectUnauthenticated, (req, res) => {
  console.log("in router.deleteIngredients");
  const ids = req.body.ids;
  if (!ids || ids.length == 0) {
    res.sendStatus(400); // Bad Request
  }

  const params = [...ids];
  const placeholders = [];
  for (let i = 1; i <= params.length; i++) {
    placeholders.push(`$${i}`);
  }

  let query = `DELETE FROM ingredients WHERE ingredients.id IN (${placeholders.join(
    ","
  )})`;
  if (req.user.id != 1) {
    query += ` AND user_id = $${params.length + 1}`;
    params.push(req.user.id);
  }

  pool
    .query(query, params)
    .then((response) => {
      console.log(`we deleted ingredients with ids ${ids}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(
        "something went wrong in ingredientRouter.deleteIngredients",
        err
      );
      res.sendStatus(500);
    });
}); //end bulk delete router

module.exports = router;
