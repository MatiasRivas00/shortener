const shortenRouter = require('express').Router()
const Shorten = require('../models/shorten')
const shortcode = require('../utils/shortcode')

shortenRouter.get('/:shortcode', async (request, response) => {
  const shortcode = request.params.shortcode
  try{
    const shorten = await Shorten.findOne({ shortcode: shortcode})
    return response.json(shorten)
  } catch (error) {
    response.status(404).end()
  }
})

shortenRouter.get('/', async (request, response) => {
  const shortenList = await Shorten.find({})

  return response.json(shortenList)
})

shortenRouter.post('/', async (request, response) => {
  const body = request.body

  const shorten = {
    'originalUrl': body.originalUrl,
    'shortcode': shortcode.generate()
  }
  
  // if generate() create two equal shortcodes in two simultanious sessions
  // then the first one is going to get the code and the second one an error to try again

  const shortenInstance = new Shorten(shorten)
  const savedShorten = await shortenInstance.save()

  return response.status(201).json(savedShorten)
})

module.exports = shortenRouter