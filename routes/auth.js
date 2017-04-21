var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---');
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---');
  done(null, obj);
});

 
passport.use(new GitHubStrategy({
    clientID: '0bf385ab0c7e47044e9f',
    clientSecret: 'af75eb6a4ad88868293c6550587b6c15d2c4d1d7',
    callbackURL: "http://yangyoung.top//auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

router.get('/github',
  passport.authenticate('github'));
 
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

module.exports = router;