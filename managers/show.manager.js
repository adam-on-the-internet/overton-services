const mongoose = require('mongoose');
require('../models/Show.model');
const Show = mongoose.model('shows');

function getAllShows() {
  return new Promise((resolve, reject) => {
    Show.find({})
      .then((shows) => {
        resolve(shows);
      });
  });
}

module.exports = {
  getAllShows
}
