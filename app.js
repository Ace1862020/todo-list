// 載入 express 並建構應用程式
const express = require('express') // 1載入 express 模組
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

const Todo = require('./models/todo')
const { findById } = require('./models/todo')

const app = express() // 2呼叫 express() 來啟動應用程式伺服器

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Setting Hnadlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 4 => 設定 首頁 路由
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// Create New todo to new-Page
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Detail Page
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//Edit Page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 3 => 設定 port 3000
// 伺服器啟動後，要開一個服務窗口，稱為埠 (port)
// 伺服器就會監聽 port 3000，任何從 port 3000 進來的瀏覽器請求
// 將被你的應用程式受理，瀏覽器就可以用網址 localhost:3000 連上你的主機
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})