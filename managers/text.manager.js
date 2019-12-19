const mongoose = require('mongoose');
require('../models/text.model');
const Text = mongoose.model('text');

function getAllText() {
  return new Promise((resolve, reject) => {
    Text.find({})
      .then((text) => {
        resolve(text);
      });
  });
}

function addText(text) {
  return new Promise((resolve, reject) => {
    const errors = checkForTextErrors(text);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Text({
        areaName: text.areaName,
        textContent: text.textContent,
        isOptional: text.isOptional
      })
        .save()
        .then((resText) => {
          resolve(resText);
        });
    }
  });
}

function deleteOneText(id) {
  return new Promise((resolve, reject) => {
    Text.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Text with given id no longer exists`
        });
      });
  });
}

function updateText(text) {
  return new Promise((resolve, reject) => {
    const id = text._id;

    Text.findOne({
      _id: id
    })
      .then((foundText) => {
        if (!foundText) {
          reject({
            message: `Failed to find text`
          });
        }

        foundText.areaName = text.areaName;
        foundText.textContent = text.textContent;
        foundText.isOptional = text.isOptional;

        foundText.save()
          .then((editedText) => {
            resolve(editedText);
          });
      });
  });
}

module.exports = {
  getAllText,
  addText,
  updateText,
  deleteOneText
}

const checkForTextErrors = ((text) => {
  let errors = [];
  if (!text.areaName) {
    errors.push({ text: 'Please add an area name' });
  }
  if (!text.isOptional && !text.textContent) {
    errors.push({ text: 'Please add text content' });
  }
  if (text.isOptional !== true && text.isOptional !== false) {
    errors.push({ text: 'Please determine if text is optional' });
  }
  return errors;
});
