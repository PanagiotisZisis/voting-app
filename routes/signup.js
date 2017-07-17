'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('signup', { errors: false });
});

router.post('/', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var errors = [];
  var regex = /^[a-z0-9]{1,20}$/i;

  if (!regex.test(username)) {
    errors.push('Invalid Username - Please keep it under 20 characters long and use only letters or numbers.');
  }
  if (!regex.test(password)) {
    errors.push('Invalid Password - Please keep it under 20 characters long and use only letters or numbers.');
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
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) throw err;
          var user = new User({
            username: username,
            password: hash
          });
          user.save(function(err) {
            if (err) throw err;
            res.redirect('/login');
          });
        });
      }
    });
  }
});

module.exports = router;