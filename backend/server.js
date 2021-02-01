import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

import connectDB from './config/db.js'

// Bring in the environment
dotenv.config()

// Connect to the database
connectDB()

// Start express 
const app = express()

// Set up Routes
app.get('/', (req, res) => {
  res.send('Start of Busy Bee')
})


// Middleware


// Middleware I wrote
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running in ${process.env.NODE_ENV} on Port ${PORT}`.yellow.underline))
