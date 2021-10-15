// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
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
// 設定 session
app.use(session({
  secret: 'mySecret',
  name: 'user',
  saveUninitialized: false,
  resave: true,
}))
// Connect flash
app.use(flash())
// global 的 middleware
// setup local variables so we can use it anywhere in our app
app.use(function (req, res, next) {
  res.locals.success = req.flash('success')
  res.locals.emptyText = req.flash('emptyText')
  res.locals.error = req.flash('error')
  res.locals.fullUrl = req.flash('fullUrl')
  next()
})

app.use(routes)


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})