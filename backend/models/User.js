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
    ],
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date
}, { timestamps: true })

// encrypt password before saving to DB
UserSchema.pre('save', async function (next) {
  // checks to see if the password was modified
  if (!this.isModified('password')) {
    next()
  }

  // creates salt and hashes the password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Instance Methods
UserSchema.methods.comparePasswords = async function (submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User

