const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Use a valid email example: example@example.com'],
      unique: true,
      lowercase: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
    },
    notes: [],
    imageUrl: {
      type: String,
      default: 'https://res.cloudinary.com/dmmhvh1ai/image/upload/v1621011645/no-profile-picture_z56xhn.jpg'
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('User', userSchema)