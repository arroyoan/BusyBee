import express from 'express'

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} from '../controllers/UserController.js'

import {
  userAuth
} from '../middleware/auth.js'


const router = express.Router()

router.route('/')
  .post(registerUser)

router.route('/profile')
  .get(userAuth, getProfile)
  .put(userAuth, updateProfile)

router.route('/login')
  .post(loginUser)

export default router
