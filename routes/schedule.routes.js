const express = require('express')
const router = express.Router()
const Subjects = require('../models/Subjects.model')

router.route('/subjects/:id')
  .get((req,res,next) => {
    const { id } = req.params
    Subjects.find()
    .then(subsFromDb => {
      // console.log('The subjects are: ', subsFromDb)
      res.render('../views/schedule/subjects.hbs', {subjects: subsFromDb, userInSession: req.session.currentUser, userId: id})
    })
  })
  .post((req,res,next) =>{
    const { id } = req.params
    let random = Math.floor(Math.random() * 11)
    console.log('req.body : ', req.body)
    Subjects.create({subjectName: "Add new Subject", teacher: "Teacher name",color: random, editDisplay: false})
    .then(() => {
      console.log('new subject added')
      res.redirect(`/subjects/${id}`)
    })
  })

//edit subjects
router.route('/subjects/:subjId/display-edit')
  .post((req,res,next) => {
    const {subjId} = req.params
    console.log('req user:', req.params)
    Subjects.findByIdAndUpdate(subjId, {editDisplay: true})
  .then(displaySubj => {
    console.log('display subj:', displaySubj);
    res.redirect(`/subjects/${subjId}`)
  })
})

router.route('/subjects/:subjId/edit')
  .post((req,res,next) =>{
    const {subjId} = req.params
    const {subjectName, teacher} = req.body
    console.log('req user' , req.body)
    Subjects.findByIdAndUpdate(subjId, {subjectName, teacher, editDisplay: false}, {new: true})
    .then(updatedSubj => {
      console.log('updated subj: ', updatedSubj)
      res.redirect(`/subjects/${subjId}`)
    })
  })

//delete subjects

  router.post(`/subjects/:id/delete`,(req,res,next) => {
    const {id} = req.params
    Subjects.findByIdAndDelete(id)
      .then(updatedSubj => {
        console.log(updatedSubj, 'Deleted')
        res.redirect(`/subjects/${id}`)
      })
      .then(()=>{
        
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