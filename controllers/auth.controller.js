const express = require('express');
const {jwtAuthenticated} = require('../utilities/auth.util');
const authController = express.Router();
const {
  sendLoggedInConfirmation,
  sendUserDetailsConfirmation,
  loginUser
} = require("../managers/auth.manager");

require('../models/User.model');

authController.get('/userDetails', jwtAuthenticated, (req, res) => {
  const user = req.userDetails;
  sendUserDetailsConfirmation(res, user);
});

authController.get('/loggedIn', jwtAuthenticated, (req, res) => {
  sendLoggedInConfirmation(res);
});

authController.post('/login', (req, res, next) => {
  loginUser(res, req, next);
});

module.exports = authController;