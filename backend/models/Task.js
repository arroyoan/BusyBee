import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  taskInfo: {
    type: String,
    required: [true, 'Please Add Task Info']
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedBy: {
    type: Date,
    default: null
  },
  notes: {
    type: String
  },
  isSubTask: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['p1', '2', 'p3', 'p4', 'none'],
    default: 'none'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: 'Section',
    required: true
  },
  subTasks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  }],
  parentTask: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    default: null
  }
}, { timestamps: true })

const Task = mongoose.model('Task', TaskSchema)

export default Task