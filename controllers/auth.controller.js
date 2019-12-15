const express = require('express');
const {jwtAuthenticated} = require('../utilities/auth.util');
const authController = express.Router();
const authManager = require("../managers/auth.manager");

require('../models/User.model');

authController.get('/userDetails', jwtAuthenticated, (req, res) => {
  const user = req.userDetails;
  authManager.sendUserDetailsConfirmation(res, user);
});

authController.get('/loggedIn', jwtAuthenticated, (req, res) => {
  authManager.sendLoggedInConfirmation(res);
});

authController.post('/login', (req, res, next) => {
  authManager.loginUser(res, req, next);
});

module.exports = authController;