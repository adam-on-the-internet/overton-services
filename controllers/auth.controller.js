const express = require('express');
const {jwtAuthenticated} = require('../utilities/auth.util');
const authController = express.Router();
const {
  sendLoggedInConfirmation,
  sendUserDetailsConfirmation,
  loginUser
} = require("../managers/auth.manager");

require('../models/User.model');

router.get('/userDetails', jwtAuthenticated, (req, res) => {
  const user = req.userDetails;
  sendUserDetailsConfirmation(res, user);
});

router.get('/loggedIn', jwtAuthenticated, (req, res) => {
  sendLoggedInConfirmation(res);
});

router.post('/login', (req, res, next) => {
  loginUser(res, req, next);
});

module.exports = authController;