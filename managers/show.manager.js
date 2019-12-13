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

function getOneShow(id) {
  return new Promise((resolve, reject) => {
    Show.findOne({
      _id: id
    })
      .then((show) => {
        if (show) {
          resolve(show);
        } else {
          reject({
            message: "Failed to find show"
          });
        }
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

function deleteOneShow(id) {
  return new Promise((resolve, reject) => {
    Show.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Show with given id no longer exists`
        });
      });
  });
}

function updateShow(show) {
  return new Promise((resolve, reject) => {
    const id = show._id;

    Show.findOne({
      _id: id
    })
      .then((foundShow) => {
        if (!foundShow) {
          reject({
            message: `Failed to find show`
          });
        }

        foundShow.title = show.title;
        foundShow.details = show.details;
        foundShow.month = show.month;
        foundShow.year = show.year;
        foundShow.showStatus = show.showStatus;

        foundShow.save()
          .then((editedShow) => {
            resolve(editedShow);
          });
      });
  });
}

module.exports = {
  getAllShows,
  getOneShow,
  addShow,
  deleteOneShow,
  updateShow
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
