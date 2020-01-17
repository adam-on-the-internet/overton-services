const { runningProd } = require('../utilities/env.util');

let allowUserCreation;

if (runningProd()) {
  allowUserCreation = process.env.ALLOW_USER_CREATION;
} else {
  try {
    const { ALLOW_USER_CREATION } = require("../local.env");
    allowUserCreation = ALLOW_USER_CREATION;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No mail setup");
    else
      throw e;
  }
}

module.exports = {
  allowUserCreation: allowUserCreation
};
