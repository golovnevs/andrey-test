module.exports = {
  env: {
    APP_ORIGIN: process.env.APP_ORIGIN,
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}
