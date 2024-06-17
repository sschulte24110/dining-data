const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(`styles GET Route`);
  let queryText = `SELECT * FROM "beer_style" ORDER BY "id"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error getting varietals', error);
    res.sendStatus(500);
  })
})

module.exports = router;