'use strict';

var express = require('express');
var router = express.Router();
var Poll = require('../models/polls');

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Poll.findOne({ _id: id }, function(err, doc) {
    if (err) throw err;
    if (!doc) {
      res.redirect('/dashboard');
    } else {
      res.render('poll', { user: req.user, poll: doc });
    }
  });
});

router.post('/:id', function(req, res) {
  var id = req.params.id;
  var vote = +req.body.vote;
  
  Poll.findOne({ _id: id }, function(err, doc) {
    if (err) throw err;
    var newVotes = doc.votes;

    newVotes[vote]++;
    var updatedDoc = {
      votes: newVotes
    };

    Poll.update({ _id: id }, updatedDoc, function(err) {
      if (err) throw err;
      console.log('vote casted!');
    });
  });
});

module.exports = router;