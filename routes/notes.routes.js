const express = require('express');
const router  = express.Router();
const Note = require('../models/Note.model')

/* GET home page */
router.route('/main-table/:id')
  .get((req, res, next) => {
    const { id } = req.params
    Note.find()
    .then(notesFromDb => {
      console.log('notes:', notesFromDb)
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