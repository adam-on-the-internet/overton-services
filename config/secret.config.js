if (process.env.NODE_ENV === 'production') {
  module.exports = {
    secret: process.env.SECRET,
    sessionSecret: process.env.SESSION_SECRET
  };
} else {
  try {
    const {SECRET} = require("../local.env");
    module.exports = {
      secret: SECRET,
      sessionSecret: SESSION_SECRET
    };
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No secret setup");
    else
      throw e;
  }
}