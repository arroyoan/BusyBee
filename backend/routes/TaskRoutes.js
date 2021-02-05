import express from 'express'

import {
  createTask,
  getSectionTasks,
  getTasksByDate,
  getSingleTask,
  updateTask,
  deleteTask
} from '../controllers/TaskController.js'

import { userAuth } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.route('/')
  .post(userAuth, createTask)
  .get(userAuth, getSectionTasks)

router.route('/:id')
  .get(userAuth, getSingleTask)
  .put(userAuth, updateTask)
  .delete(userAuth, deleteTask)


export default router