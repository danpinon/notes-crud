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

    switch (status) {
      case 'toDo':
        toDoBoolean = true
        break;
      case 'doToday':
        doTodayBoolean = true
        break;
      case 'inProgress':
        inProgressBoolean = true
        break
      case 'done':
        doneBoolean = true
        break;
      default:
        console.log('Error occured on notes.routes.js')
        break
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
      // console.log('delete:', updatedNote)
      res.redirect(`/main-table/${id}`)
      
    })
    .catch(e => console.log('There was an error while deleting the drone'))
});

// backward note
router.post('/main-table/:id/backward', (req, res, next) => {

  const { id } = req.params
  const { backward } = req.body

  let status
  let toDoBoolean = false
  let doTodayBoolean    = false
  let inProgressBoolean = false
  let doneBoolean       = false

  switch (backward) {
    case 'toDo':
      status            = 'toDo'
      toDoBoolean       = true
      doTodayBoolean    = false
      inProgressBoolean = false
      doneBoolean       = false
      break;
    case 'doToday':
      status = 'toDo'
      toDoBoolean       = true
      doTodayBoolean    = false
      inProgressBoolean = false
      doneBoolean       = false
      break;
    case 'inProgress':
      status = 'doToday'
      toDoBoolean       = false
      doTodayBoolean    = true
      inProgressBoolean = false
      doneBoolean       = false
      break;
    case 'done':
      status = 'inProgress'
      toDoBoolean       = false
      doTodayBoolean    = false
      inProgressBoolean = true
      doneBoolean       = false
      break;
    default:
      status = backward
      if (backward == 'toDo') {
        toDoBoolean = true
      } else if (backward = 'doToday') {
        doTodayBoolean = true
      } else if (backward = 'inProgress') {
        inProgressBoolean = true
      } else if (backward = 'done') {
        doneBoolean = true
      }
      break;
  }
  
  Note.findByIdAndUpdate(id, { status, toDoBoolean, doTodayBoolean, inProgressBoolean, doneBoolean }, { new: true })
    .then(() => res.redirect(`/main-table/${id}`))
    .catch(err => console.log('Error on backward', err))
  

});

// backward note
router.post('/main-table/:id/foreward', (req, res, next) => {

  const { id } = req.params
  const { foreward } = req.body

  let status
  let toDoBoolean = false
  let doTodayBoolean    = false
  let inProgressBoolean = false
  let doneBoolean       = false

  switch (foreward) {
    case 'toDo':
      status            = 'doToday'
      toDoBoolean       = false
      doTodayBoolean    = true
      inProgressBoolean = false
      doneBoolean       = false
      break;
    case 'doToday':
      status = 'inProgress'
      toDoBoolean       = false
      doTodayBoolean    = false
      inProgressBoolean = true
      doneBoolean       = false
      break;
    case 'inProgress':
      status = 'done'
      toDoBoolean       = false
      doTodayBoolean    = false
      inProgressBoolean = false
      doneBoolean       = true
      break;
    case 'done':
      status = 'done'
      toDoBoolean       = false
      doTodayBoolean    = false
      inProgressBoolean = false
      doneBoolean       = true
      break;
    default:
      status = backward
      if (backward == 'toDo') {
        toDoBoolean = true
      } else if (backward = 'doToday') {
        doTodayBoolean = true
      } else if (backward = 'inProgress') {
        inProgressBoolean = true
      } else if (backward = 'done') {
        doneBoolean = true
      }
      break;
  }
  
  Note.findByIdAndUpdate(id, { status, toDoBoolean, doTodayBoolean, inProgressBoolean, doneBoolean }, { new: true })
    .then(() => res.redirect(`/main-table/${id}`))
    .catch(err => console.log('Error on foreward', err))
  

});
  


module.exports = router;