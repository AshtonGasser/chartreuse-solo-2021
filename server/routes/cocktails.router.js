const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET Route⬇
router.get ('/', (req,res) => {
    console.log('got to cocktails.router');
    pool
    .query(`SELECT * FROM "cocktails";`)
    .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error GET /cocktails", error);
        res.sendStatus(500);
      });
  });


// Post Route⬇
router.post('/', (req,res) => {
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