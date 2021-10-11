// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const URL = require('./models/url')
const shortenUrl = require('./shortenUrl')

const domains = 'http://localhost:3000/'

const app = express()

// 設定資料庫連線
mongoose.connect('mongodb://localhost/url-shortener')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定靜態文件
app.use(express.static('public'))
// use body-parser
app.use(express.urlencoded({ extended: true}))

// 設定首頁路由
app.get('/', (req, res) => {
  URL.find()
    .lean()
    .then(urls => res.render('index', { urls }))
    .catch(error => console.error(error))
})

// 產生短網址
app.post('/', (req, res) => {
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

app.get('/:shortUrl', (req, res) => {
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

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})