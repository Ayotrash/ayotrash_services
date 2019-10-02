const express = require('express')
const Promise = require('bluebird')

const router = express.Router()

const { 
  server_error_internal
} = require('../../helpers/responsers')

const {
  registerUser,
  login
} = require('./controllers')

router.post('/register', function(req, res) {
  Promise.try(() => registerUser(req.body))
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => {
      console.log(error)
      res.status(500).send(server_error_internal(`App Server Error, please contact the admin.`))
    })
})

router.post('/login', function(req, res) {
  Promise.try(() => login(req.body))
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => {
      console.log(error)
      res.status(500).send(server_error_internal(`App Server Error, please contact the admin.`))
    })
})

module.exports = router