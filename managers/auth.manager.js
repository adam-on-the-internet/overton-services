const passport = require('passport');

function loginUser(res, req, next) {
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    }
    else {
      res.status(401).json(info);
    }
  })(req, res, next);
}

function sendUserDetailsConfirmation(res, user) {
  res.send({
    text: `Hello, ${user.name}, you are authenticated.`,
    userId: user._id,
    email: user.email,
    name: user.name,
    exp: user.exp,
    iat: user.iat,
    authorized: true,
  });
}

function sendLoggedInConfirmation(res) {
  res.send({
    text: `You are logged in.`,
    authorized: true
  });
}

module.exports = {
  sendLoggedInConfirmation,
  sendUserDetailsConfirmation,
  loginUser
}
