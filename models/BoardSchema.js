const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subtaskSchema = new Schema({
  title: { type: String, default: '' },
  isCompleted: { type: Boolean, default: false },
})

const taskSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, default: '' },
  subtasks: [subtaskSchema],
})

const columnSchema = new Schema({
  name: String,
  tasks: [taskSchema],
})

const boardSchema = new Schema({
  name: String,
  columns: [columnSchema],
})

const mainSchema = new Schema({
  boards: [boardSchema],
})

module.exports = mongoose.model('boards', mainSchema)
