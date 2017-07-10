'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/');
});

module.exports = router;