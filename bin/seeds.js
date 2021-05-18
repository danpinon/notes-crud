// Iteration #1

const mongoose = require('mongoose')

const Note = require('../models/Note.model')

//connects to the database require
require("../config/db.config")

const notes = [
    {
        title: 'new note',
        content: 'hello world'
    },
    {
      title: 'new note',
      content: 'hello world'
    },
    {
    title: 'new note',
    content: 'hello world'
    }
]

Note.create(notes)
    .then(dbNotes => {
        console.log(`Created ${dbNotes.length} notes`)
        mongoose.connection.close()
    })
    .catch(e => console.log(`An error ocurred while creating notes in the DB`))
