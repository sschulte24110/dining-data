const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/beers GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  let queryText = `SELECT * FROM "beers";`;
  pool.query(queryText).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('/beers POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const queryText = `INSERT INTO "beers" ("name", "brewery", "beer_style", "abv", "photo_url", "description", "vendor_id", "user_id")
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);`
  try {
      const result = await pool.query(queryText, [req.body.name, req.body.brewery, req.body.beer_style, req.body.abv, req.body.photo_url, req.body.description, req.body.vendor_id, req.user.id]);
      res.send(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  console.log(`in /beers put`);
  
  const queryText =
    'UPDATE "beers" SET name=$1, brewery=$2, beer_style=$3, abv=$4, photo_url=$5, description=$6, vendor_id=$7 WHERE id=$8 AND "user_id"=$9;';
  await pool
    .query(queryText, [
      req.body.name,
      req.body.brewery,
      req.body.beer_style, 
      req.body.abv,
      req.body.photo_url,
      req.body.description,
      req.body.vendor_id,
      req.params.id,
      req.user.id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in put:', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `DELETE FROM "beers" WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in DELETE item`, error);
      res.sendStatus(500);
    });
});

module.exports = router;