const config = require('./config')
const info = (...params) => {
  if (config.DEBUG) console.log(...params)
}

const error = (...params) => {
  if (config.DEBUG) console.log(...params)
}

module.exports = {
  info,
  error
}