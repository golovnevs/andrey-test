module.exports = (() => {
  if (process.env.APP_ORIGIN) {
    return process.env.APP_ORIGIN
  } else if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  return 'http://localhost:3000'
})()
