const express = require('express')
const emailRouter = require('./routes/email');
const statusRouter = require('./routes/status');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const config = require('./config')
const app = express()
const scheduler = require('./scheduler')

scheduler.init()
app.use(require('morgan')(config.logLevel));
app.use(bodyParser.json())
app.use(expressValidator())
app.use(emailRouter);
app.use(statusRouter);

app.listen(config.port)