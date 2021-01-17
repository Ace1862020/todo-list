const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true //必填欄位
  }
})

module.exports = mongoose.model('Todo', todoSchema)