import mongoose from 'mongoose'

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Add a Section Title']
  },
  color: {
    type: String,
    enum: ['gray'],
    default: 'gray'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})