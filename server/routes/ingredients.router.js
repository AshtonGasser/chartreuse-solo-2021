const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('got to ingredients.get');
    const query = `SELECT * FROM "ingredients"`
    pool.query(query)
    .then(result => {
  res.send(result.rows)
    })
    .catch(err => {
      console.error('ERROR in ingredient.router GET -> ', err)
      res.sendStatus(500)
    })
  });



  module.exports = router