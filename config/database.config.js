if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-laibl.mongodb.net/test?retryWrites=true&w=majority`
  };
} else {
  try {
    const {MONGO_USER, MONGO_PASS} = require("../local.env");
    module.exports = {
      mongoURI: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-laibl.mongodb.net/test?retryWrites=true&w=majority`
    };
  }
  catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
      console.log("No db setup");
    else
      throw e;
  }
}

