const { runningProd } = require('../utilities/env.util');

let mongoUser;
let mongoPass;

if (runningProd()) {
  mongoUser = process.env.MONGO_USER;
  mongoPass = process.env.MONGO_PASS;
  mongoCluster = process.env.MONGO_CLUSTER;
} else {
  try {
    const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER } = require("../local.env");
    mongoUser = MONGO_USER;
    mongoPass = MONGO_PASS;
    mongoCluster = MONGO_CLUSTER;
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No mongo setup");
    else
      throw e;
  }
}

module.exports = {
  mongoURI: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}/test?retryWrites=true&w=majority`
};
