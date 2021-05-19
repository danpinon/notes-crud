const express = require('express');
const router  = express.Router();
const Note = require('../models/Note.model')

/* GET home page */
router.route('/main-table/:id')
  .get((req, res, next) => {
    const { id } = req.params
    Note.find()
    .then(notesFromDb => {
      // console.log('notes:', notesFromDb)
      res.render(`notes/main-table`,{ notes: notesFromDb, userInSession: req.session.currentUser, userId: id }) 
    })
    
  })
  .post((req, res, next) => {
    const { id } = req.params
    const { status } = req.body
    let toDoBoolean = false
    let doTodayBoolean    = false
    let inProgressBoolean = false
    let doneBoolean       = false


    if (status == 'toDo') {
      toDoBoolean = true
    } else if (status == 'doToday') {
      doTodayBoolean = true
    } else if (status == 'inProgress') {
      inProgressBoolean = true
    } else if (status == 'done') {
      doneBoolean = true
    }
    
    // console.log('req.body:', req.body.status)
    Note.create({title: "new note", content: "you can start writing here", status, toDoBoolean, doTodayBoolean, inProgressBoolean, doneBoolean})
    .then(() => {
      // console.log('note created succesfully')
      res.redirect(`/main-table/${id}`)
    })
  })

  //edit note
  router.route('/main-table/:noteId/edit')
    // .get((req, res, next) => {
    //   const { noteId } = req.params
    //   console.log('edit note id:', req.params)
    //   Note.findById(noteId)
    //   .then(noteToEdit => {
    //     console.log('updated Note:', noteToEdit)
    //     res.render('notes/main-table', { note: noteToEdit, userInSession: req.session.currentUser})
    //   })
    // })
    .post((req, res, next) => {
      const { noteId } = req.params
      const { title, content } = req.body
      console.log('req user:', req.body)
      Note.findByIdAndUpdate(noteId, {title, content}, {new: true})
      .then(updatedNote => {
        console.log('update note:', updatedNote)
        res.redirect(`/main-table/${noteId}`)
      })
    })

  //deletes note
  router.post('/main-table/:id/delete', (req, res, next) => {

    const { id } = req.params

  
    Note.findByIdAndDelete(id)
      .then(updatedNote => {
        console.log('delete:', updatedNote)
        res.redirect(`/main-table/${id}`)
        
      })
      .catch(e => console.log('There was an error while deleting the drone'))
  });
  


module.exports = router;