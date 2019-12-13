const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const { jwtSecret } = require('../utilities/auth.util');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.generateJwt = function() {
  let expiry = new Date();
  const daysTilExpire = 7;
  expiry.setDate(expiry.getDate() + daysTilExpire);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, jwtSecret);
};

mongoose.model('users', UserSchema);