import mongoose from 'mongoose'

const SectionSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: [1, 'Please make the title at least 1 character long'],
    maxlength: [20, 'Max Title length is 20 characters'],
    required: [true, 'Please Add a Section Title']
  },
  color: {
    type: String,
    enum: ['Gray', 'Light Blue', 'Purple', 'Red', 'Orange', 'Green', 'Yellow', 'Blue'],
    default: 'Gray'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

// This is where the cascading delete of tasks will happen

// This is where the adding of tasks will happen

const Section = mongoose.model('Section', SectionSchema)

export default Section