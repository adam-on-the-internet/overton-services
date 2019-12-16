const { runningProd } = require('../utilities/env.util');

let mailerEmail;
let mailerPass;

if (runningProd()) {
  mailerEmail = process.env.MAIL_EMAIL;
  mailerPass = process.env.MAIL_PASS;
} else {
  try {
    const { MAIL_EMAIL, MAIL_PASS } = require("../local.env");
    mailerEmail = MAIL_EMAIL;
    mailerPass = MAIL_PASS;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No mail setup");
    else
      throw e;
  }
}

module.exports = {
  mailerEmail: mailerEmail,
  mailerPass: mailerPass
};
