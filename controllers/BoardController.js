const board = require('../models/BoardSchema')
const mongoose = require('mongoose')

// get all Board
const getBoards = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' })
  }

  const boards = await board.findOne(
    { boards: { $elemMatch: { _id: id } } },
    { boards: 1 }
  )

  if (!boards) {
    return res.status(404).json({ error: 'No such Board' })
  }

  res.status(200).json(boards)
}

// get a single Board
const getBoard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' })
  }

  const boards = await board.findOne(
    { boards: { $elemMatch: { _id: id } } },
    { 'boards.columns': 1 }
  )

  if (!boards) {
    return res.status(404).json({ error: 'No such Board' })
  }

  const columns = boards.boards
  res.status(200).json(columns)
}

// get a single Board
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' })
  }

  const boards = await board.findOne(
    { boards: { $elemMatch: { _id: id } } },
    { 'boards.columns.tasks': 1 }
  )

  if (!boards) {
    return res.status(404).json({ error: 'No such Board' })
  }

  const columns = boards.boards
  res.status(200).json(columns)
}

// create a new Board
const createBoard = async (req, res) => {
  const newBoard = req.body

  // add to the database
  try {
    const boards = await board.create(newBoard)
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// create a new Board
const createBoards = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  // add to the database
  try {
    const boards = await board.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    )
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update a Column
const createColumn = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  const boards = await board.findOneAndUpdate(
    { 'boards._id': id },
    {
      ...req.body,
    }
  )

  if (!boards) {
    return res.status(400).json({ error: 'No such Board' })
  }

  res.status(200).json(boards)
}

// create a new Tasks
const createTasks = async (req, res) => {
  const { id, id2 } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  // add to the database
  try {
    const boards = await board.updateOne(
      { 'boards._id': id, 'boards.columns._id': id2 },
      {
        ...req.body,
      }
    )
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// create a new Subtasks
const createSubtasks = async (req, res) => {
  const { id, id2, id3 } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  // add to the database
  try {
    const boards = await board.updateOne(
      {
        'boards._id': id,
        'boards.columns._id': id2,
        'boards.columns.tasks._id': id3,
      },
      {
        ...req.body,
      }
    )
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update subtask title field
const updateSubtaskTitle = async (req, res) => {
  const { id, id2, id3, id4 } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  // add to the database
  try {
    const boards = await board.updateOne(
      {
        'boards._id': id,
        'boards.columns._id': id2,
        'boards.columns.tasks._id': id3,
        'boards.columns.tasks.subtasks._id': id4,
      },
      {
        ...req.body,
      },
      {
        arrayFilters: [
          {
            'subtasks._id': id4,
          },
        ],
      }
    )
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update subtask title field
const updateTestSubtaskTitle = async (req, res) => {
  const { id, id2, id3, id4 } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No valid id' })
  }

  // add to the database
  try {
    const boards = await board.updateOne(
      {},
      {
        ...req.body,
      },
      {
        arrayFilters: [
          {
            'boards._id': id,
            'columns._id': id2,
            'tasks._id': id3,
            'subtask._id': id4,
          },
        ],
      }
    )
    res.status(200).json(boards)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
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
}
