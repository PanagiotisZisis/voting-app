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
  } else {
    Poll.find({ username: req.user.username }, function(err, docs) {
      if (err) throw err;
      if (!docs) {
        return res.render('dashboard', { user: req.user.username, polls: false });
      } else {
        res.render('dashboard', { user: req.user, polls: docs });
      }
    });
  }
});

router.get('/', isLoggedIn, function(req, res) {
  res.redirect('/dashboard/' + req.user.username);
});

router.post('/:username/create', isLoggedIn, function(req, res) {
  console.log(req.body);
  var user = req.params.username;
  var username = req.user.username;

  if (user !== username) {
    return res.redirect('/dashboard/' + username);
  } else {
    var title = req.body.title;
    var labels = req.body.labels;
    var votes = [];
    var pollId = '';

    for (var i = 0; i < labels.length; i++) {
      votes.push(0);
    }

    var newPoll = new Poll({
      username: username,
      title: title,
      labels: labels,
      votes: votes
    });

    // checking first for duplicate
    Poll.findOne({ title: title }, function(err, doc) {
      if (err) throw err;
      if (doc) {
        res.redirect('/dashboard/' + username);
      } else {
        newPoll.save(function(err, doc) {
          if (err) throw err;
          pollId = doc._id;
          console.log('new poll saved');
          res.json({ success: 'success' });
        });
      }
    });
  }
});

router.delete('/:username/delete', isLoggedIn, function(req, res) {
  if (req.params.username !== req.user.username) {
    res.redirect('/dashboard/' + req.user.username);
  } else {
    var id = req.body.id;
    id = id.replace(/^\"|\"$/g, '');
    console.log(id);
    Poll.deleteOne({ _id: id }, function(err) {
      if (err) throw err;
      console.log('poll deleted');
      res.json({ success: 'success' });
    });
  }
});

module.exports = router;