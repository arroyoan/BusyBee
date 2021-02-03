import express from 'express'

import {
  registerUser,
  loginUser,
  getProfile
} from '../controllers/UserController.js'

import {
  userAuth
} from '../middleware/auth.js'


const router = express.Router()

router.route('/')
  .post(registerUser)

router.route('/profile')
  .get(userAuth, getProfile)

router.route('/login')
  .post(loginUser)

export default router
