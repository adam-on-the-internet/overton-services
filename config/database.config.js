const { mongoUser, mongoPass, mongoCluster } = require('./env.config');

module.exports = {
  mongoURI: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}/test?retryWrites=true&w=majority`
};
