
'use strict';

const app = require('express').Router();
const email = require('../controllers/email');

app.post('/v1/send', email.send)

module.exports = app;