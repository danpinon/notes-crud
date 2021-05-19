const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  console.log('index req: ', req.params)
  res.render('index', { userInSession: req.session.currentUser });
});

module.exports = router;
