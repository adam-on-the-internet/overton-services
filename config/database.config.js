const { runingProd } = require('../utilities/env.util');

let mongoUser;
let mongoPass;

if (runingProd) {
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
  mongoURI: buildMongoURI(mongoUser, mongoPass)
};

const buildMongoURI = ((user, pass) => {
  return `mongodb+srv://${user}:${pass}@cluster0-laibl.mongodb.net/test?retryWrites=true&w=majority`;
});

