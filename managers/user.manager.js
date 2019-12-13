const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { logError } = require('../utilities/logger.util');

require('../models/User.model');
const User = mongoose.model('users');

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find({})
      .select('-password')
      .sort({ date: 'desc' })
      .then((users) => {
        resolve(users);
      });
  });
}

function getSingleUser(id) {
  return new Promise((resolve, reject) => {
    User.findOne({
      _id: id
    })
      .select('-password')
      .sort({ date: 'desc' })
      .then((userRes) => {
        if (userRes) {
          resolve(userRes);
        }
        else {
          reject({
            message: "Failed to find user"
          });
        }
      });
  });
}

function register(user) {
  return new Promise((resolve, reject) => {
    let errors = checkForRegsitrationErrors(user);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      User.findOne({
        email: user.email
      })
        .then((userToRegister) => {
          if (userToRegister) {
            reject({ message: "Email already registered" });
          }
          else {
            user.password = generateRandomPassword();
            registerUser(user)
              .then((res) => {
                resolve({
                  message: res.message,
                  newPassword: user.password
                });
              })
              .catch((err) => {
                reject(err);
              });
          }
        });
    }
  });
}

function resetPassword(email) {
  return new Promise((resolve, reject) => {

    const newPassword = generateRandomPassword();
    User.findOne({
      email: email
    })
      .then((foundUser) => {
        if (!foundUser) {
          reject({
            message: `FAILURE: no user found with id ${id}`
          });
        }
        editPassword(foundUser, newPassword)
          .then((res) => {
            resolve({
              newPassword: newPassword
            });
          })
          .catch((err) => {
            logError(err);
            reject(err);
          });
      });
  });
}

module.exports = {
  getAllUsers,
  getSingleUser,
  register,
  resetPassword
}

function generateRandomPassword() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function editPassword(user, newPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err)
          throw err;
        user.password = hash;
        user.save()
          .then((editedUser) => {
            resolve({
              message: `User ${editedUser.name} password updated.`,
              email: editedUser.email
            });
          })
          .catch((err) => {
            logError(err);
            reject(err);
          });
      });
    });
  });
}

function registerUser(user) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          throw err;
        const newUser = new User({
          name: user.name,
          email: user.email,
          admin: user.admin,
          password: hash,
          specialAccess: user.specialAccess
        });
        newUser.save()
          .then((registeredUser) => {
            resolve({
              message: `User ${registeredUser.name} successfully registered.`,
            });
          })
          .catch((err) => {
            logError(err);
            reject(err);
          });
      });
    });
  });
}

function checkForRegsitrationErrors(user) {
  let errors = [];
  if (!user.name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!user.email) {
    errors.push({ text: 'Please add a email' });
  }
  return errors;
}
