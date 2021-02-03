import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

import UserRoutes from './routes/UserRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
import connectDB from './config/db.js'

// Bring in the environment
dotenv.config()

// Connect to the database
connectDB()

// Start express 
const app = express()

// Middleware
// Json Parser Middleware
app.use(express.json())

// Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mounting Routes
app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/auth/', AdminRoutes)

// Custom Middleware

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.underline))
