const URL = require('../url')
const db = require('../../config/mongoose')

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

db.once('open', () => {
  urlData.forEach((item) => {
    URL.create({
      fullUrl: item.fullUrl,
      shortUrl: item.shortUrl
    })
  })
  console.log('Seed data created done! Ctrl+C to Exit.')
})