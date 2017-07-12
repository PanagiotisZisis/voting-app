'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
  title: String,
  labels: [String],
  values: [Number]
});

module.exports = mongoose.model('polls', pollsSchema);