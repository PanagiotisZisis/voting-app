'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('signup', { errors: false });
});

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var errors = [];

  if (username === '') {
    errors.push('The Username field is required.');
  }
  
  if (password === '') {
    errors.push('The Password field is required.');
  }

  if (errors.length !== 0) {
    res.render('signup', { errors: errors });
  }

  if (errors.length === 0) {
    User.findOne({ username: username }, function(err, doc) {
      if (err) throw err;
      if (doc) {
        errors.push('This Username already exists.');
        res.render('signup', { errors: errors });
        console.log('user already exists');
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) throw err;
          var user = new User({
            username: username,
            password: hash
          });
          user.save(function(err) {
            if (err) throw err;
            console.log('new user saved');
            res.render('signup', { errors: false });
          });
        });
      }
    });
  }
});

module.exports = router;