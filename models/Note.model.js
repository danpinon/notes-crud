const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    refUser: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    status: String,
    toDoStatus: Boolean
  },
  {
    timestamps: true
  }
)

module.exports = model('Note', userSchema)