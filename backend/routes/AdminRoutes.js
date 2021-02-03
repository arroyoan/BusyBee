import express from 'express'

import {
  getAllUsers,
  getSingleUser
} from '../controllers/AdminController.js'

import {
  userAuth,
  admin
} from '../middleware/auth.js'


const router = express.Router()

router.route('/')
  .get(userAuth, admin, getAllUsers)

router.route('/:id')
  .get(userAuth, admin, getSingleUser)

export default router
