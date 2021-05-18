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
    const { title, content} = req.body
    console.log('req.body:', req.body)
    Note.create({title: "new note", content: "you can start writing here"})
    .then(() => {
      console.log('note created succesfully')
      res.redirect('/main-table')
    })
  })

router.route('/new-note')
  .get((req, res, next) => res.render('new-note'))

module.exports = router;