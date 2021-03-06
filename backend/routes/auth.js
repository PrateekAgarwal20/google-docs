// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('../models/models');

module.exports = function(passport) {

  router.post('/signup', function(req, res) {
    // validation step
    console.log("good stuff");
    console.log(req.body.username);
    if (req.body.password!==req.body.passwordRepeat) {
      return res.send("Passwords don't match."
      );
    }
    var u = new models.User({
      username: req.body.username,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }

      res.send("registered");
    });
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'),function(req, res){
    console.log(req.user._id);
    return res.send({userId: req.user._id});
  });

  router.get('/logout', function(req, res) {
      console.log("get logout route");
    req.logout();
  });

  return router;
};
