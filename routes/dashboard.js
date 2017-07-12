'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Poll = require('../models/polls');

router.get('/:username', function(req, res) {
  res.render('dashboard');
});

module.exports = router;