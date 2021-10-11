const express = require('express')
const router = express.Router()
//引用 URL model
const URL = require('../../models/url')

const shortenUrl = require('../../shortenUrl')
const domains = 'http://localhost:3000/'

// 設定首頁路由
router.get('/', (req, res) => {
  URL.find()
    .lean()
    .then(urls => res.render('index', { urls }))
    .catch(error => console.error(error))
})

// 產生短網址
router.post('/', (req, res) => {
  const fullUrl = req.body.fullUrl
  URL.findOne({ fullUrl })
    .lean()
    .then( url => {
      let shortenLink = ''

      if(!url) {
        let shortUrl = shortenUrl()
        URL.create({ fullUrl, shortUrl })
        shortenLink = domains + shortUrl
      } else {
        // 輸入相同網址時，產生一樣的縮址
        shortenLink = domains + url.shortUrl
      }

      res.render('index', { fullUrl, shortenLink })     
    })
    .catch(error => console.error(error))
})

// 設定轉址
router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  URL.findOne({ shortUrl })
    .lean()
    .then( url => {
      if ( url ) {
        return res.status(301).redirect(url.fullUrl)
      }
    })
    .catch(() => { res.sendStatus(404) })
})

module.exports = router