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



  module.exports = router