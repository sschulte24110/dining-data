const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/beers GET route');
  let queryText = `SELECT * FROM "beers" WHERE deleted = FALSE ORDER BY name;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`Getting Beers with specific style`);
  let queryText = `SELECT 
    beers.id,
    beers.name,
    beers.brewery,
    beers.beer_style,
    beers.abv,
    beers.photo_url,
    beers.description,
    beers.vendor_id,
    beers.deleted,
    beers.out_of_stock,
    beer_style.beer_style AS beer_style_name
FROM 
    beers
JOIN 
    beer_style ON beers.beer_style = beer_style.id
WHERE beer_style.id=$1 and beers.deleted=false
ORDER BY name;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
      console.log(`Beers of selected style`, result.rows);
    })
    .catch((error) => {
      console.log(`Error getting beers with specific style`);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('/beers POST route');
  const queryText = `INSERT INTO "beers" ("name", "brewery", "beer_style", "abv", "photo_url", "description", "vendor_id", "user_id")
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);`;
  try {
    const result = await pool.query(queryText, [
      req.body.name,
      req.body.brewery,
      req.body.beer_style,
      req.body.abv,
      req.body.photo_url,
      req.body.description,
      req.body.vendor_id,
      req.user.id,
    ]);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  console.log(`in /beers put`);

  const queryText = `UPDATE "beers" SET name=$1, brewery=$2, beer_style=$3, abv=$4, photo_url=$5, description=$6, vendor_id=$7, out_of_stock=$8 WHERE id=$9 AND "user_id"=$10;`;
  await pool
    .query(queryText, [
      req.body.name,
      req.body.brewery,
      req.body.beer_style,
      req.body.abv,
      req.body.photo_url,
      req.body.description,
      req.body.vendor_id,
      req.body.out_of_stock,
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

// router.put('/:id/outofstock', rejectUnauthenticated, (req, res) => {
//   const beerId = req.params.id;
//   const { out_of_stock } = req.body;

//   const queryText = `UPDATE "beers" SET "out_of_stock" = $1 WHERE "id" = $2;`;

//   pool
//     .query(queryText, [out_of_stock, beerId])
//     .then(() => res.sendStatus(200))
//     .catch((error) => {
//       console.log(`Error updating out of stock status`, error);
//       res.sendStatus(500);
//     });
// });

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `UPDATE "beers" SET deleted = true WHERE id=$1;`;
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
