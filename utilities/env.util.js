module.exports = {
  runningProd: (() => {
    return process.env.NODE_ENV === 'production';
  }),
}