const { runningProd } = require('../utilities/env.util');

let mailerEmail;
let mailerPass;
let mongoUser;
let mongoPass;
let mongoCluster;
let allowUserCreation;
let secret;
let sessionSecret;

if (runningProd()) {
  mailerEmail = process.env.MAIL_EMAIL;
  mailerPass = process.env.MAIL_PASS;
  mongoUser = process.env.MONGO_USER;
  mongoPass = process.env.MONGO_PASS;
  mongoCluster = process.env.MONGO_CLUSTER;
  allowUserCreation = process.env.ALLOW_USER_CREATION;
  secret = process.env.SECRET;
  sessionSecret = process.env.SESSION_SECRET;
} else {
  try {
    const {
      MAIL_EMAIL, MAIL_PASS,
      MONGO_USER, MONGO_PASS,
      MONGO_CLUSTER, ALLOW_USER_CREATION,
      SECRET, SESSION_SECRET
    } = require("../local.env");

    allowUserCreation = ALLOW_USER_CREATION;
    mongoUser = MONGO_USER;
    mongoPass = MONGO_PASS;
    mongoCluster = MONGO_CLUSTER;
    mailerEmail = MAIL_EMAIL;
    mailerPass = MAIL_PASS;
    secret = SECRET;
    sessionSecret = SESSION_SECRET;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("Env setup incomplete");
    else
      throw e;
  }
}

module.exports = {
  mailerEmail: mailerEmail,
  mailerPass: mailerPass,
  mongoUser: mongoUser,
  mongoPass: mongoPass,
  mongoCluster: mongoCluster,
  allowUserCreation: allowUserCreation,
  secret: secret,
  sessionSecret: sessionSecret
};
