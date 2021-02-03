import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

// @desc    Get All Users
// @route   GET /api/v1/auth/
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  const count = await User.countDocuments()
  res.status(200).json({
    count,
    users
  })
})

// @desc    Get Single User
// @route   GET /api/v1/auth/:id
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user)
})

// @desc    Update User Info
// @route   PUT /api/v1/auth/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => { })


// @desc    Delete User
// @route   DELETE /api/v1/auth/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => { })

export {
  getAllUsers,
  getSingleUser
}