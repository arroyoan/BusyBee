import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an Email!'],
    unique: [true, 'This email has already been used'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a vaild email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least one lowercase letter and uppercase letter, one number, and on special character '
    ]
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

// Instance Methods for users

//this is where the encrypt password goes

const User = mongoose.model('User', UserSchema)

export default User

