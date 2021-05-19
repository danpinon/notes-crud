const mongoose = require ('mongoose')
const {Schema, model} = mongoose

const subjectSchema = new Schema(
  {
    subjectName : {
      type: String,
      default: '  Class 101',
      trim: true,
      required: [true, 'Subject name is required']
    },
    teacher: {
      default: 'John Doe',
      type: String,
    },
    days: {
      type: String,
      default: 'Monday',
      enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      required: [true, 'Please select the days that you have scheduled this subject']
    },
    startTime: {
      type: String,
      default: '9:00',
      required: [true,'Please add the starting hour for your class.']
    },
    endTime: {
      type: String,
      default: '10:00',
      required: [true,'Please add the ending hour for your class.']
    },
    evaluationCriteria:{
      type: String
    },
    program: {
      type: String
    },
    color: {
      type: String,
      default: 'gray',
      enum: ['gray', 'blue', 'green', 'red','yellow','aqua'],
      required:[true],
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Subjects', subjectSchema)