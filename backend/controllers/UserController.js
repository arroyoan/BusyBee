import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Create a new user
// @route   POST /api/v1/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body

  // Checks to see if the user already exists
  const userCheck = await User.findOne({ email })
  if (userCheck) {
    res.status(400)
    throw new Error('User with that email already exists!')
  }

  // this creates a new user with the given info
  const user = await User.create({
    email,
    name,
    password
  })

  // Checks that a user was created and returns json
  if (user) {
    res.status(201).json({
      _id: user._id,
      email,
      name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Information')
  }
})

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.comparePasswords(password))) {
    res.status(200)
      .json({
        _id: user._id,
        email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
  } else {
    res.status(400)
    throw new Error('Invalid Email or Password')
  }
})

// @desc    Get user info
// @route   GET /api/v1/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  // uses req.user._id
  res.json({
    message: 'Will get to this route'
  })
})

// @desc    Forgot Password
// @route   PUT /api/v1/users/forgotpassword
// @access  Public

export {
  registerUser,
  loginUser,
  getProfile
}
