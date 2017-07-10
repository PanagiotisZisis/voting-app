'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var User = require('../models/users');

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
  })(req, res);
});

module.exports = router;