const mailgun = require('../services/mailgun')
const sendgrid = require('../services/sendgrid')

exports.status = (req, res) => {
  mailgunStatus = mailgun.getStatus()
  sendgridStatus = sendgrid.getStatus()
  res.setHeader('Content-Type', 'application/json')
  res.send(
    {
      _self: {
        status: "OK",
        version: "0.0.1"
      },
      mailgun: mailgunStatus,
      sendgrid: sendgridStatus
    }
  )
}