import User from '../models/User.js'
import JWT from 'jsonwebtoken'

// Checks to see if it is a logged in user
const userAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.substr(0, 6) === 'Bearer') {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = JWT.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Invalid Authorization')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('No token found')
  }
}

// Checks to see if the user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized, Must be Admin sorry :)')
  }
}

export {
  userAuth,
  admin
}