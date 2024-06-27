const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/wines GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  let queryText = `SELECT * FROM "wines" WHERE deleted = FALSE ORDER BY name_winery;`;
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

router.get('/winesoutofstock/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "wines" WHERE out_of_stock = TRUE ORDER BY name_winery;`
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error getting out of stock', error);
    res.sendStatus(500);
  })
})

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`Getting Wines with specific varietal`);
  let queryText = `SELECT
	wines.id, 
	wines.name_winery,
	wines.wine_varietal_id,
	wines.region,
	wines.year,
	wines.photo_url,
	wines.description,
	wines.vendor_id,
  wines.deleted,
  wines.out_of_stock,
	wine_varietal.wine_varietal as wine_varietal_name
FROM wines
JOIN wine_varietal ON wines.wine_varietal_id = wine_varietal.id
WHERE wine_varietal.id=$1 and wines.deleted=false and wines.out_of_stock=false
ORDER BY name_winery;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error getting wines with specific varietal`);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('/wines POST route');
  const queryText = `INSERT INTO "wines" ("name_winery", "wine_varietal_id", "region", "year", "photo_url", "description", "vendor_id", "user_id")
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);`;
  try {
    const result = await pool.query(queryText, [
      req.body.name_winery,
      req.body.wine_varietal_id,
      req.body.region,
      req.body.year,
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
  console.log(`in /wines put`);

  const queryText =
    `UPDATE "wines" SET name_winery=$1, wine_varietal_id=$2, region=$3, year=$4, photo_url=$5, description=$6, vendor_id=$7 WHERE id=$8 AND "user_id"=$9;`;
  await pool
    .query(queryText, [
      req.body.name_winery,
      req.body.wine_varietal_id,
      req.body.region,
      req.body.year,
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

router.put('/winedetails/:id', rejectUnauthenticated, async (req, res) => {
  const queryText = `UPDATE "wines" SET "out_of_stock" = true WHERE "id" = $1`;
  await pool.query(queryText, [req.params.id])
  .then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(`Error in out of stock`, error);
    res.sendStatus(500);
  })
})

router.put('/winesoutofstock/:id', rejectUnauthenticated, async (req, res) => {
  const queryText = `UPDATE "wines" SET "out_of_stock" = false WHERE "id" = $1;`;
  await pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in back in of stock`, error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `UPDATE "wines" SET deleted = true WHERE id=$1;`;
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
