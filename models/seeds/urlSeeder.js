const mongoose = require('mongoose')
const Url = require('../url')
mongoose.connect('mongodb://localhost/url-shortener')
const db = mongoose.connection

const urlData = [
  {
    fullUrl: 'https://www.google.com/',
    shortUrl: 'derD3'
  },
  {
    fullUrl: 'https://www.taaze.tw/',
    shortUrl: 'djkCE'
  },
  {
    fullUrl: 'https://www.cwb.gov.tw/',
    shortUrl: 'jkJQ5'
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  urlData.forEach((item) => {
    Url.create({
      fullUrl: item.fullUrl,
      shortUrl: item.shortUrl
    })
  })
  console.log('Seed data created done! Ctrl+C to Exit.')
})