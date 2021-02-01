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

// @desc    Get All Users
// @route   GET /api/v1/users/
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// @desc    Get Single User
// @route   GET /api/v1/users/profile
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  // need to do req.user._id with the token
})


// @desc    Update User Info
// @route   PUT /api/v1/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => { })


// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => { })


// @desc    Forgot Password
// @route   PUT /api/v1/users/forgotpassword
// @access  Public

export {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}
