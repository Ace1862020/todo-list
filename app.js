// 載入 express 並建構應用程式
const express = require('express') // 1載入 express 模組
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
// 由於Mongoose 連線設定只需要「被執行」
// 所以不會接到任何回傳參數繼續利用，所以不需要再設定變數
require('./config/mongoose')

const app = express() // 2呼叫 express() 來啟動應用程式伺服器

// Setting Hnadlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Setting Method-override
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 4 => 設定路由首頁 => 移到 home 模組
// Create New todo to new-Page => todos.js
// Detail Page => todos.js
// Edit Page => todos.js
// Delete Function => todos.js

// 3 => 設定 port 3000
// 伺服器啟動後，要開一個服務窗口，稱為埠 (port)
// 伺服器就會監聽 port 3000，任何從 port 3000 進來的瀏覽器請求
// 將被你的應用程式受理，瀏覽器就可以用網址 localhost:3000 連上你的主機
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})