import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

// @desc    Get All Users
// @route   GET /api/v1/auth/
// @access  Admin
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
// @access  Admin
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user)
})

// @desc    Update User Info
// @route   PUT /api/v1/auth/:id
// @access  Admin
const updateUser = asyncHandler(async (req, res) => {
  const { email, name, password, isAdmin } = req.body

  const user = await User.findById(req.params.id)

  // change info as necessary
  user.email = email || user.email
  user.name = name || user.name
  user.password = password || user.password
  user.isAdmin = isAdmin || user.isAdmin

  const updatedUser = await user.save({ validateModifiedOnly: true })

  res.status(200).json({
    _id: updatedUser._id,
    email: updatedUser.email,
    name: updatedUser.name,
    isAdmin: updatedUser.isAdmin
  })

})


// @desc    Delete User
// @route   DELETE /api/v1/auth/:id
// @access  Admin
const deleteUser = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
  res.json({})

})

export {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}