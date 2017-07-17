'use strict';

var express = require('express');
var router = express.Router();
var Poll = require('../models/polls');

router.get('/', function(req, res) {
  Poll.find(function(err, docs) {
    if (err) throw err;
    res.render('index', { user: req.user, polls: docs });
  });
  console.log(req.user);
});

module.exports = router;