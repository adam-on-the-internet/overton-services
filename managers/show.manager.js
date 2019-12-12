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

function addShow(show) {
  return new Promise((resolve, reject) => {
    const errors = checkForShowErrors(show);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Show({
        title: show.title,
        details: show.details,
        month: show.month,
        year: show.year,
        showStatus: show.showStatus
      })
        .save()
        .then((resShow) => {
          resolve(resShow);
        });
    }
  });
}

module.exports = {
  getAllShows,
  addShow
}

const checkForShowErrors = ((show) => {
  let errors = [];
  if (!show.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!show.month) {
    errors.push({ text: 'Please add a month' });
  }
  if (!show.year) {
    errors.push({ text: 'Please add a year' });
  }
  if (!show.showStatus) {
    errors.push({ text: 'Please add a show status' });
  }
  return errors;
});
