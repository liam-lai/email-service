const express = require('express')
const emailRouter = require('./routes/email')
const statusRouter = require('./routes/status')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()
const scheduler = require('./scheduler')
const expressValidation = require('express-validation')

scheduler.init()
app.use(require('morgan')(config.logLevel))
app.use(bodyParser.json())
app.use(emailRouter)
app.use(statusRouter)
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    res.status(err.status).json(err)
  } else {
    res.status(err.status)
      .json({
        status: err.status,
        message: err.message
      })
  }
})

console.log('start listening port', config.port);
app.listen(config.port)
