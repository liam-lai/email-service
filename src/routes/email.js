const validate = require('express-validation')
const validations = require('./validate')

const app = require('express').Router()
const email = require('../controllers/email')

app.post('/v1/send', validate(validations.send), email.send)

module.exports = app