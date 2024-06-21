const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "vendors" WHERE deleted = FALSE ORDER BY vendor_name;`;
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

router.post('/', rejectUnauthenticated, async (req, res) => {
  const queryText = `INSERT INTO "vendors" ("vendor_name", "contact_person_name","phone_number", "address", "city", "state", "zip_code", "email")
VALUES
($1, $2, $3, $4, $5, $6, $7, $8);`;
  try {
    const result = await pool.query(queryText, [
      req.body.vendor_name,
      req.body.contact_person_name,
      req.body.phone_number,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.email,
    ]);
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const queryText =
    'UPDATE "vendors" SET vendor_name=$1, contact_person_name=$2, phone_number=$3, address=$4, city=$5, state=$6, zip_code=$7, email=$8 WHERE id=$9';
  await pool
    .query(queryText, [
      req.body.vendor_name,
      req.body.contact_person_name,
      req.body.phone_number, 
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.email,
      req.params.id,
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
  const queryText = `UPDATE "vendors" SET deleted = true WHERE id=$1;`;
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