const express = require('express')
const {
  getBoards,
  getBoard,
  createBoard,
  createBoards,
  createColumn,
  createTasks,
  createSubtasks,
  updateSubtaskTitle,
  getTask,
  updateTestSubtaskTitle,
} = require('../controllers/BoardController')

const router = express.Router()

// GET all Boards
router.get('/data/:id', getBoards)

// GET a single Board
router.get('/:id', getBoard)

// GET a single Board
router.get('/task/:id', getTask)

// POST a new Board
router.post('/', createBoard)

// UPDATE a Board
router.patch('/newboard/:id', createBoards)

// UPDATE a Column
router.patch('/column/:id', createColumn)

// UPDATE a Tasks
router.patch('/tasks/:id/:id2', createTasks)

// UPDATE a Subtasks
router.patch('/tasks/:id/:id2/:id3', createSubtasks)

// UPDATE a Subtasks title
router.patch('/tasks/:id/:id2/:id3/:id4', updateSubtaskTitle)

// UPDATE a Subtasks title
router.patch('/test/:id/:id2/:id3/:id4', updateTestSubtaskTitle)

module.exports = router
