const express = require('express')
const router = express.Router()
const Subjects = require('../models/Subjects.model')

router.route('/subjects')
  .get((req,res,next) => {
    Subjects.find()
    .then(subsFromDb => {
      console.log('The subjects are: ', subsFromDb)
      res.render('../views/schedule/subjects.hbs', {subjects: subsFromDb})
    })
  })
  .post((req,res,next) =>{
    console.log('req.body : ', req.body)
    Subjects.create({subjectName: "Add new Subject", teacher: "Teacher name"})
    .then(() => {
      console.log('new subject added')
      res.redirect('/subjects')
    })
  })

//delete subjects

  router.post('/subjects/:id/delete',(req,res,next) => {
    const {id} = req.params
    Subjects.findByIdAndDelete(id)
      .then(updatedSubj => {
        console.log(updatedSubj, 'Deleted')
        res.redirect('/subjects')
      })
      .catch(e => console.log('There was an error deleting the subject'))
  })

//calendar
router.route('/calendar')
  .get((req,res,next) => {
    Subjects.find()
    .then(subsFromDb=> {
      res.render('../views/schedule/weekly-calendar.hbs')
    })
  })
  .post((req, res,next) => {
    console.log('req.body: ', req.body)
    Subjects.create({subjectName: "Add new Subject" })
    .then (()=> {
      console.log('new subject added')
      res.redirect('/calendar')
    })
  })

  router.post('/calendar/:id/delete',(req,res,next) => {
    const {id} = req.params
    Subjects.findByIdAndDelete(id)
      .then(updatedSubj => {
        console.log(updatedSubj, 'Deleted')
        res.redirect('/subjects')
      })
      .catch(e => console.log('There was an error deleting the subject'))
  })

  module.exports = router