const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET Route⬇

//post id + user_id
router.get('/cocktails/:id', rejectUnauthenticated, (req,res) => {
  //console.log('this is our cocktai; request:', req.user);
  const cocktail_ID = req.params.id 
    console.log('got to cocktails.router');
    //let myCocktailId = req.query.id
    let myQuery= `SELECT "cocktails".name AS "cocktail", ARRAY_AGG( "ingredients".name) AS "ingredients", ARRAY_AGG("cocktails_ingredients".measurement_type) AS "measurement", ARRAY_AGG("cocktails_ingredients".number) FROM "cocktails"
    JOIN "cocktails_ingredients" ON "cocktails".id = "cocktails_ingredients".cocktail_id
    JOIN "ingredients" ON  "cocktails_ingredients".ingredient_id = "ingredients".id
    WHERE "cocktails".id = $1
    GROUP BY cocktails.id;`

    pool.query(myQuery, cocktail_ID)
    .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error GET /cocktails", error);
        res.sendStatus(500);
      });
  });


// Post Route⬇
router.post('/',rejectUnauthenticated, (req,res) => {
    //sanitize , object model
    const {name, description, instructions, ingredients, glass} = req.body
    let queryText = `INSERT INTO "cocktails" (name, description, instructions, ingredients, glass )
    VALUES ($1, $2, $3, $4, $5);`;
    const values = [name, description, instructions, ingredients, glass ]
    .query(queryText, values)
    .then((result) => {
        console.log(result);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`oh no there is in ${err} in POST`);
      res.sendStatus(500);
    });
}) 
module.exports = router;