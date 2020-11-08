import mongoose from 'mongoose'

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true,
    min: 0
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
})

const gradeModel = mongoose.model('grade', gradeSchema, 'grade')

export { gradeModel }