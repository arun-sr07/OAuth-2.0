const express = require('express');
const session = require('express-session');

const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const dbConnect = require("./config/dbConnect");
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const passport = require('passport');


const app = express();

dbConnect();
app.set('view engine', 'ejs');

app.use(session({
  secret: keys.session.cookieKey,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log("listening 3000");
});
