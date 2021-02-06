import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'

// @desc    Create a task
// @route   POST /api/v1/sections/:sectionId/tasks/
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { taskInfo } = req.body

  // Creates the new Task with the model
  const task = new Task({
    taskInfo,
    user: req.user._id,
    section: req.params.sectionId
  })

  // creates the new Task in the database
  const newTask = await Task.create(task)

  res.status(201).json({
    _id: newTask._id,
    completed: newTask.completed,
    completedBy: newTask.completedBy,
    notes: newTask.notes,
    priority: newTask.priority,
    user: newTask.user,
    section: newTask.section
  })

})

// @desc    Create a subtask
// @route   POST /api/v1/sections/:sectionId/tasks/:id
// @access  Private
const createSubTask = asyncHandler(async (req, res) => {
  const { taskInfo } = req.body

  // get the parent task
  const task = await Task.findById(req.params.id)

  // make sure parent task exists
  if (!task) {
    res.status(404)
    throw new Error(`Could not find task with id ${req.params.id}`)
  }

  // make sure the current user owns this task
  if (String(task.user) !== String(req.user._id)) {
    res.status(401)
    throw new Error(`Unauthorized to change this task`)
  }

  // create the child task
  const subTask = Task({
    taskInfo,
    isSubTask: true,
    user: req.user._id,
    section: req.params.sectionId,
    parentTask: req.params.id
  })

  // put the child task in the db
  const newSubTask = await Task.create(subTask)

  // add the child task to the array of subtasks in the parent
  task.subTasks.push(newSubTask)

  // update the parent task in the db
  const updatedTask = await task.save()

  // return the thing
  res.json({
    newSubTask,
    updatedTask
  })

})

// @desc    GET all tasks for a section
// @route   GET /api/v1/sections/:sectionId/tasks/
// @access  Private
const getSectionTasks = asyncHandler(async (req, res) => {
  const count = await Task.countDocuments({ section: req.params.sectionId, user: req.user._id, isSubTask: false, completed: false })
  const tasks = await Task.find({ section: req.params.sectionId, user: req.user._id, isSubTask: false, completed: false }).populate({
    path: 'subTasks',
    populate: {
      path: 'subTasks',
      populate: {
        path: 'subTasks',
        populate: {
          path: 'subTasks',
          populate: {
            path: 'subTasks'
          }
        }
      }
    }
  })
  if (tasks) {
    res.json({
      count,
      tasks
    })
  } else {
    res.status(404)
    throw new Error(`Sorry couldn't find tasks under the section id ${req.params.sectionId}`)
  }
})

// @desc    Get all tasks by date 
// @route   GET /api/v1/tasks/:dayWeek
// @access  Private
const getTasksByDate = asyncHandler(async (req, res) => {

})

// @desc    Get a single task
// @route   GET /api/v1/tasks/:id
// @access  Private
const getSingleTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  // Checks that task exists
  if (task) {
    if (String(req.user._id) !== String(task.user)) {
      res.status(401)
      throw new Error('Not Authorized to view this task!')
    }
    res.json(task)
  } else {
    res.status(404)
    throw new Error(`Could not find task with id ${req.params.id}`)
  }
})

// @desc    Update Task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { taskInfo, notes, priority, completed } = req.body

  const task = await Task.findById(req.params.id)
  // Checks that task exists
  if (!task) {
    res.status(404)
    throw new Error(`Could not find task with id ${req.params.id}`)
  }

  // Check this task belongs to this user
  if (String(req.user._id) !== String(task.user)) {
    res.status(401)
    throw new Error('Not Authorized to view this task!')
  }

  // Can now add changes to task
  task.taskInfo = taskInfo || task.taskInfo
  task.notes = notes || task.notes
  task.priority = priority || task.priority
  if (completed != null) {
    task.completed = completed
  }

  // Saves the changes to the database
  const updatedTask = await task.save({ validateModifiedOnly: true })

  res.json({
    _id: updatedTask._id,
    taskInfo: updatedTask.taskInfo,
    priority: updatedTask.priority,
    notes: updatedTask.notes,
    completed: updatedTask.completed
  })
})

// @desc    Schedule a date for a task
// @route   PUT /api/v1/tasks/:id/schedule
// @access  Private
const scheduleTask = asyncHandler(async (req, res) => {

})

// @desc    DELETE Task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  // Checks that task exists
  if (!task) {
    res.status(404)
    throw new Error(`Could not find task with id ${req.params.id}`)
  }

  // Check this task belongs to this user
  if (String(req.user._id) !== String(task.user)) {
    res.status(401)
    throw new Error('Not Authorized to view this task!')
  }

  // Check to see if this is a subtask
  // if it is have to delete it from parent subTask array
  if (task.isSubTask) {
    // gets the parent task from the database
    const parentTask = await Task.findById(task.parentTask)

    // pulls the child task out using the .pull method
    parentTask.subTasks.pull({ _id: task._id })

    // Saves the parent task in the db with the removed item
    await parentTask.save()
  }

  // Delete the task from the db
  await Task.deleteOne({ _id: req.params.id })

  res.json({})

})

export {
  createTask,
  createSubTask,
  getSectionTasks,
  getTasksByDate,
  getSingleTask,
  updateTask,
  scheduleTask,
  deleteTask
}