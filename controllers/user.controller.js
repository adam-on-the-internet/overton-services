const express = require('express');
const { jwtAuthenticated } = require('../utilities/auth.util');
const userController = express.Router();

const {
  getAllUsers,
  getSingleUser,
  register,
  resetPassword
} = require("../managers/user.manager");

const {
  sendEmail
} = require("../utilities/mailer.util");

userController.get('/', jwtAuthenticated, (req, res) => {
  getAllUsers()
  .then((users) => {
    res.send({
      users: users
    });
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

userController.get('/:id', jwtAuthenticated, (req, res) => {
  const id = req.params.id;
  getSingleUser(id)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

userController.post('/', jwtAuthenticated, (req, res) => {
  const user = req.body;
  register(user)
  .then((registrationResponse) => {
    const recipient = user.email;
    const subject = "Welcome to Andrew Overton Portfolio";
    const message = `Your temporary password is ${registrationResponse.newPassword}.`;
    sendEmail(recipient, subject, message);
    res.send({
      message: registrationResponse.message
    });
  })
  .catch((err) => {
    res.statusCode = 500;
    res.send(err);
  });
});

userController.put('/passwordReset', (req, res) => {
  const email = req.body.email;
  resetPassword(email)
  .then((response) => {
    const recipient = email;
    const subject = "Password Reset";
    const message = `Your new password is ${response.newPassword}`;
    sendEmail(recipient, subject, message);
    res.send({
      message: "Password reset"
    });
  })
  .catch((err) => {
    const recipient = email;
    const subject = "Password Reset Attempted";
    const message = `Unable to reset password for Andrew Overton Portfolio. Are you sure this email address is registered?`;
    sendEmail(recipient, subject, message);
    res.statusCode = 500;
    res.send(err);
  });
});

module.exports = userController;