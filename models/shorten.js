const mongoose = require('mongoose')

const shortenSchema = mongoose.Schema({
  originalUrl: {type: String, required: true},
  shortcode: {type: String, unique: true},
  count: {type: Number, default: 0},
  created: {type: Date, default: Date.now, expires: 3*24*60*60} // expires in 3 days
})

shortenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Shorten = mongoose.model('Shorten', shortenSchema)

module.exports = Shorten