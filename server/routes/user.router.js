const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/users/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "user" WHERE deleted = false ORDER BY id;`;
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

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (name, username, password)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [name, username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

router.put(`/:id/admin`, rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const { isAdmin } = req.body;
  
  const queryText = `UPDATE "user" SET "admin_status" = $1 WHERE "id" = $2;`;
  
  pool
    .query(queryText, [isAdmin, userId])
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log('Error in updating admin status', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const queryText = `UPDATE "user" SET deleted = true WHERE "id"=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in DELETE user`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
