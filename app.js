// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

// 設定 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定靜態文件
app.use(express.static('public'))
// use body-parser
app.use(express.urlencoded({ extended: true}))
app.use(routes)



// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})