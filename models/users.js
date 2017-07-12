'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  polls: [String]
});

module.exports = mongoose.model('users', userSchema);