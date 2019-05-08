const mailgun = require('./mailgun')
const sendgrid = require('./sendgrid')

const getList = () => {
  const mailServiceList = []
  mailgunStatus = mailgun.getStatus()
  if (mailgun.getStatus().status === 'ok') {
    mailServiceList.push(mailgun, sendgrid)
  } else {
    mailServiceList.push(sendgrid, mailgun)
  }
  return mailServiceList
}

module.exports = {
  getList
}