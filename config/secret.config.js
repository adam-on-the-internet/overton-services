const { runningProd } = require('../utilities/env.util');

let secret;
let sessionSecret;

if (runningProd()) {
  secret = process.env.SECRET;
  sessionSecret = process.env.SESSION_SECRET;
} else {
  try {
    const { SECRET, SESSION_SECRET } = require("../local.env");
    secret = SECRET;
    sessionSecret = SESSION_SECRET;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No secret setup");
    else
      throw e;
  }
}

module.exports = {
  secret: secret,
  sessionSecret: sessionSecret
};
