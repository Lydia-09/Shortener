const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  fullUrl: {
    type: String,
    unique: true,
    required: true
  },
  shortUrl: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)