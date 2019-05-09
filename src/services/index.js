const mailgun = require('./mailgun')
const sendgrid = require('./sendgrid')

const getList = () => {
  const mailServiceList = []
  mailgunStatus = mailgun.getStatus()
  if (sendgrid.getStatus().status === 'ok') {
    mailServiceList.push(sendgrid, mailgun)
  } else {
    mailServiceList.push(mailgun, sendgrid)
  }
  return mailServiceList
}

module.exports = {
  getList
}