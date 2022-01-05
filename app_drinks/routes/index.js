var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  )
);

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate(
    'google',
    {
      successRedirect: '/drinks',
      failureRedirect: '/drinks'
    }
  )
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/drinks');
});

module.exports = router;
