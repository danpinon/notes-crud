const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    refUser: {
      type: Schema.Types.ObjectId, ref: "User"
    },
    title: String,
    content: String
  },
  {
    timestamps: true
  }
)

module.exports = model('Note', userSchema)