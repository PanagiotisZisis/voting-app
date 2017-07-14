'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Poll = require('../models/polls');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/:username', isLoggedIn, function(req, res) {
  if (req.params.username !== req.user.username) {
    return res.redirect('/dashboard/' + req.user.username);
  }
  res.render('dashboard', { user: req.user });
});

router.get('/', isLoggedIn, function(req, res) {
  res.redirect('/dashboard/' + req.user.username);
});

router.post('/:username/create', isLoggedIn, function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;