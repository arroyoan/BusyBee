import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
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

// @desc   Login user through google auth0
// @route  POST /api/v1/users/login/google
// @access Public
// do this at a later point

// @desc    Get user info
// @route   GET /api/v1/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user)
})

// @desc   Update user Profile
// @route  PUT /api/v1/users/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const { email, name, oldPassword, newPassword } = req.body

  const user = await User.findById(req.user._id)
  user.email = email || user.email
  user.name = name || user.name

  // checks if there is a new password 
  if (newPassword) {
    // checks old password matches password in the database
    if (oldPassword && await user.comparePasswords(oldPassword)) {
      user.password = newPassword
    } else {
      res.status(200)
      throw new Error('Old password is incorrect!')
    }
  }

  // saves the updated information
  // validateModifiedOnly means that unless something was changed it wont check validation on the piece of the model
  const newUser = await user.save({ validateModifiedOnly: true })

  res.status(200).json({
    _id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    isAdmin: newUser.isAdmin
  })

})

// @desc    Forgot Password
// @route   POST /api/v1/users/forgotpassword
// @access  Public

// @desc    Reset Password
// @route   PUT /api/v1/users/resetpassword/:resettoken
// @access  Private


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
}
