const redirectRouter = require('express').Router()
const Shorten = require('../models/shorten')

redirectRouter.get('/:shortcode', async (request, response) => {
  const shortcode = request.params.shortcode

  const shorten = await Shorten.findOne({ shortcode: shortcode })
  if (!shorten) {
    return response.status(404).end()
  }
  const originalUrl = shorten.originalUrl

  shorten.count += 1
  await shorten.save()

  console.log(shorten)

  response.redirect(originalUrl)
})

module.exports = redirectRouter