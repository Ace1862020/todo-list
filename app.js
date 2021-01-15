// 載入 express 並建構應用程式
const express = require('express') // 1載入 express 模組
const app = express() // 2呼叫 express() 來啟動應用程式伺服器

// 4 => 設定路由
app.get('/', (req, res) => {
  res.send('Hello world!!')
})

// 3 => 設定 port 3000
// 伺服器啟動後，要開一個服務窗口，稱為埠 (port)
// 伺服器就會監聽 port 3000，任何從 port 3000 進來的瀏覽器請求
// 將被你的應用程式受理，瀏覽器就可以用網址 localhost:3000 連上你的主機
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})