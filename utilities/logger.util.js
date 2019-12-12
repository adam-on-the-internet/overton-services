module.exports = {
  logInfo: ((message) => {
    console.log(message);
  }),
  logError: ((message) => {
    console.error("ERROR: " +message);
  }),
  logDebug: ((message) => {
    console.debug("debug: " + message);
  })
}