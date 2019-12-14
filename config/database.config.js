const { runingProd } = require('../utilities/env.util');

let mongoUser;
let mongoPass;

if (runingProd()) {
  mongoUser = process.env.MONGO_USER;
  mongoPass = process.env.MONGO_PASS;
} else {
  try {
    const { MONGO_USER, MONGO_PASS } = require("../local.env");
    mongoUser = MONGO_USER;
    mongoPass = MONGO_PASS;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No mongo setup");
    else
      throw e;
  }
}

module.exports = {
  mongoURI: `mongodb+srv://${mongoUser}:${mongoPass}@cluster0-laibl.mongodb.net/test?retryWrites=true&w=majority`
};
