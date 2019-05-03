'use strict';

const app = require('express').Router();
const statusController = require('../controllers/status');

app.get('/v1/status', statusController.status)

module.exports = app;
