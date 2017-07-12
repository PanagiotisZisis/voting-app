'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login', { errors: false });
});

router.post('/', function(req, res, next) {
  var errors = [];
  var username = req.body.username;
  var password = req.body.password;

  if (username === '' || password === '') {
    errors = 'Both Username and Password fields are required.';
  }
  if (errors.length > 0) {
    return res.render('login', { errors: errors });
  }
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) {
      errors = 'Invalid credendtials.';
      return res.render('login', { errors: errors });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard/' + req.user.username);
    });
  })(req, res, next);
});

module.exports = router;