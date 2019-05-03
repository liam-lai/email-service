const mailgun = require('../services/mailgun')

exports.status = (req, res) => {
  mailgunStatus = mailgun.getStatus()
  res.setHeader('Content-Type', 'application/json')
  res.send(
    {
      status: "OK",
      version: "0.0.1",
      mailgun: mailgunStatus,
      sendgrid: 'pending'
    }
  )
}