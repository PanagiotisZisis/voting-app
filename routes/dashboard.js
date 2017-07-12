'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Poll = require('../models/polls');

router.get('/:username', function(req, res) {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('dashboard');
});

router.get('/', function(req, res) {
  if (req.user) {
    return res.redirect('/dashboard/ + ' + req.user.username);
  }
  res.redirect('/');
});

module.exports = router;