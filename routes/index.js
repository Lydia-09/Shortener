const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
router.use('/', home)

module.exports = router