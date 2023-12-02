const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../model/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
 // scope: ['profile']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then((currentUser) => {
    if (currentUser) {
      console.log('User found:', currentUser);
      done(null, currentUser); 
    } else {
      new User({
        username: profile.displayName,
        googleId: profile.id
      }).save().then((newUser) => {
        console.log('New user created:', newUser);
        done(null, newUser); 
      });
    }
  }).catch((error) => {
    console.error('Error during authentication:', error);
    done(error, null);
  });
}));

module.exports = passport;
