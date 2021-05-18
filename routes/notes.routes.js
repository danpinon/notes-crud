const express = require('express');
const router  = express.Router();
const Note = require('../models/Note.model')

/* GET home page */
router.route('/main-table')
  .get((req, res, next) => {
    Note.find()
    .then(notesFromDb => {
      console.log('notes:', notesFromDb)
      res.render('notes/main-table',{ notes: notesFromDb}) 
    })
    
  })
  .post((req, res, next) => {
    const { title, content, status} = req.body
    console.log('req.body:', req.body)
    Note.create({title: "new note", content: "you can start writing here", status})
    .then(() => {
      console.log('note created succesfully')
      res.redirect('/main-table')
    })
  })


module.exports = router;