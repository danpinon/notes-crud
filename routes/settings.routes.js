const express = require('express');
const router  = express.Router();
const User    = require('../models/User.model')

const bcrypt = require('bcrypt')
const saltRounds = 10

/* GET home page */
router.route('/settings/:id')
  .get((req, res, next) => {
    const { id } = req.params
    User.findById(id)
      .then((theUser) => {
        res.render(
          'settings/settings', 
          {
            userInSession: req.session.currentUser,
            userData: theUser,
            userDisplay: {
              content: 'hidden',
              changeButton: '',
              cancelButton: 'hidden'
            },
            emailDisplay: {
              content: 'hidden',
              changeButton: '',
              cancelButton: 'hidden'
            },
            passwordDisplay: {
              content: 'hidden',
              changeButton: '',
              cancelButton: 'hidden'
            }
          });
      })
    
  })
  .post((req, res, next) => {
    const { id } = req.params
    let { userDisplayStatus, emailDisplayStatus, passwordDisplayStatus } = req.body

    console.log(req.body, emailDisplayStatus)

    let changeButtonUname = 'hidden'
    if (userDisplayStatus === 'hidden') {
      changeButtonUname = ''
    }
    if (userDisplayStatus == undefined) {
      userDisplayStatus = 'hidden'
      changeButtonUname = ''
    }

    let changeButtonEmail = 'hidden'
    if (emailDisplayStatus === 'hidden') {
      changeButtonEmail = ''
    }
    if (emailDisplayStatus == undefined) {
      emailDisplayStatus = 'hidden'
      changeButtonEmail = ''
    }

    let changeButtonPassword = 'hidden'
    if (passwordDisplayStatus === 'hidden') {
      changeButtonPassword = ''
    }
    if (passwordDisplayStatus == undefined) {
      passwordDisplayStatus = 'hidden'
      changeButtonPassword = ''
    }

    User.findById(id)
      .then(theUser => {
        res.render(
          'settings/settings', 
          { 
            userInSession: req.session.currentUser,
            userData: theUser,
            userDisplay: {
              content: userDisplayStatus,
              changeButton: changeButtonUname,
              cancelButton: userDisplayStatus
            },
            emailDisplay: {
              content: emailDisplayStatus,
              changeButton: changeButtonEmail,
              cancelButton: emailDisplayStatus
            },
            passwordDisplay: {
              content: passwordDisplayStatus,
              changeButton: changeButtonPassword,
              cancelButton: passwordDisplayStatus
            }
          });
      })
    
  })

router.post('/settings/:id/uname', (req, res, next) => {
  const { id } = req.params
  const { username } = req.body

  // Validations
  if (username === "") {
    res.redirect(`/settings/${id}`)
    return
  }

  User.findByIdAndUpdate(id, { username }, { new: true })
    .then(() => res.redirect(`/settings/${id}`))
})

router.post('/settings/:id/email', (req, res, next) => {
  const { id } = req.params
  const { email } = req.body

  // Validations
  if (!email) {
    res.redirect(`/settings/${id}`)
    return
  }

  User.findByIdAndUpdate(id, { email }, { new: true })
    .then(() => res.redirect(`/settings/${id}`))
})

router.post('/settings/:id/password', (req, res, next) => {
  const { id } = req.params
  const { password } = req.body

  // Validations
  if (!password) {
    res.redirect(`/settings/${id}`)
    return
  }

  // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/ // Checks that it have 7 chars or more.

  // if (!regex.test(password)) {
  //   res.redirect(`/settings/${id}`)
  //   return
  // }

  bcrypt
      .hash(password, saltRounds)
      .then(hashedPassword => {
        return User.findByIdAndUpdate(id, { hashedPassword }, { new: true })
      })
      .then(userFromDB => {
        res.redirect(`/settings/${id}`)
        return
      })
      .catch(error => {
        console.log(error)
      })
})

module.exports = router;
