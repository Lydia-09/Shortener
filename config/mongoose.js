const mongoose = require('mongoose')
// 設定資料庫連線
mongoose.connect('mongodb://localhost/url-shortener')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db