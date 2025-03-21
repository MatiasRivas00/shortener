require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const DEBUG = Boolean(process.env.DEBUG)
const PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  DEBUG,
  PORT
}