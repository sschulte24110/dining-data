const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const beersRouter = require('./routes/beers.router');
const stylesRouter = require('./routes/styles.router');
const winesRouter = require('./routes/wines.router');
const varietalsRouter = require('./routes/varietals.router');
const vendorsRouter = require('./routes/vendors.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/beers', beersRouter);
app.use('/api/styles', stylesRouter);
app.use('/api/wines', winesRouter);
app.use('/api/varietals', varietalsRouter);
app.use('/api/vendors', vendorsRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
