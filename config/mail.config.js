if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mailerEmail: process.env.MAIL_EMAIL,
    mailerPass: process.env.MAIL_PASS
  };
} else {
  try {
    const {MAIL_EMAIL, MAIL_PASS} = require("../local.env");
    module.exports = {
      mailerEmail: MAIL_EMAIL,
      mailerPass: MAIL_PASS
    };
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No mailer setup");
    else
      throw e;
  }
}