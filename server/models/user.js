const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  IdInstance: {type: String, required: true, unique: true},
  ApiTokenInstance: {type: String, required: true, unique: true},
})

module.exports = model('User', User)