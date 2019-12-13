var jwt = require('express-jwt');
const {secret} = require('../config/secret.config');

module.exports = {
  jwtSecret: secret,
  jwtAuthenticated: jwt({
    secret: secret,
    userProperty: 'userDetails'
  }),
}
