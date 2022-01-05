const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // verify callback function
    async function(accessToken, refreshToken, profile, cb) {
      // a user has logged in with Google
      try {
        let user = await User.findOne({googleId: profile.id});
        if (user) return cb(null, user);
        // we have a NEW user
        user = await User.create({
          name: profile.displayName,
          google_id: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
        cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(userId, cb) {
  User.findById(userId)
    .then(function(user) {
      return cb(null, user);
    });
});