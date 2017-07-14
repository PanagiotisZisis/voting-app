'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
  title: String,
  labels: [String],
  votes: [Number]
});

module.exports = mongoose.model('polls', pollsSchema);