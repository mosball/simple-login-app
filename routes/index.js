const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.locals.userName = '권기웅'
  res.render('index')
})

module.exports = router