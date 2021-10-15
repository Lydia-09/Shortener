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
  // 去除網址末端的 '/'，讓相同網址的判斷有一致性。
  const inputUrl = req.body.fullUrl.trim()
  const lastText = inputUrl.charAt(inputUrl.length-1)
  let fullUrl = ''
  if (lastText === '/') {
    fullUrl += inputUrl.substring(0, inputUrl.lastIndexOf('/'))
  } else {
    fullUrl += inputUrl
  }
  req.flash('fullUrl', fullUrl)

  // 若使用者輸入的網址中，有多餘的空白字元，則防止表單送出並提示使用者
  if (fullUrl.includes(' ')) {
    req.flash('error', '您輸入的網址中，有多餘的空白字元，請重新輸入。')
    return res.redirect('/')
  }
  
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
        
      req.flash('success', shortenLink)
      return res.redirect('/')   
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