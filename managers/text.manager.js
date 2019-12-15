const mongoose = require('mongoose');
require('../models/Text.model');
const Text = mongoose.model('text');

function getAllText() {
  return new Promise((resolve, reject) => {
    Text.find({})
      .then((text) => {
        resolve(text);
      });
  });
}

module.exports = {
  getAllText
}