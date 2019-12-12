if (process.env.NODE_ENV === 'production') {
  module.exports = {
    secret: process.env.SECRET
  };
} else {
  try {
    const {SECRET} = require("../local.env");
    module.exports = {
      secret: localSecret
    };
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No secret setup");
    else
      throw e;
  }
}