// 總路由器
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 todos 模組程式碼
const todos = require('./modules/todos')

// 將網址結構符合 / 字串的 request 導向 home 模組
// 如果 request 路徑是 / 就去執行 modules/homes 裡的程式碼
router.use('/', home)
// 如果 req 路徑是 /todos 就去執行 modules/todos 裡的程式碼
router.use('/todos', todos)

module.exports = router