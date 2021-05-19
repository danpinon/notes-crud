const express = require('express');
const router  = express.Router();
const User    = require('../models/User.model')

const bcrypt = require('bcrypt')
const saltRounds = 10

/* GET home page */
router.route('/settings/:id')
  .get((req, res, next) => {
  res.render('settings/settings', { userInSession: req.session.currentUser });
  })
  .post((req, res, next) => {
    const { id } = req.params
    const { email, password } = req.body

    // Validations
    if (!email || !password) {
      res.render('auth/signup', {
        errorMessage: "All the fields must be filled."
      })
      return
    }

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/ // Checks that it have 7 chars or more.

    // if (!regex.test(password)) {
    //   res.status(500).render('auth/signup', {
    //     errorMessage: 'The password must have at least 8 characters'
    //   })
    //   return
    // }

    bcrypt
      .hash(password, saltRounds)
      .then(hashedPassword => {
        return User.findByIdAndUpdate(id, { email, hashedPassword }, { new: true })
      })
      .then(userFromDB => {
        console.log('user information updated succesfully')
        res.redirect(`/main-table/${id}`)
      })
      .catch(err => console.log(err))

  })

module.exports = router;
