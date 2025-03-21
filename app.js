const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')
const shortenRouter = require('./routers/shorten')
const redirectRouter = require('./routers/redirect')
const morgan = require('morgan')

logger.info(`connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(_ => logger.info(`connected to ${config.MONGODB_URI}`))
  .catch(error => logger.error(`not connected, error: ${error.message}`))

app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/', redirectRouter)
app.use('/api/shorten', shortenRouter)

module.exports = app