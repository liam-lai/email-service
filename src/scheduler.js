var cron = require('node-cron')
const mailgun = require('./services/mailgun')
const sendgrid = require('./services/sendgrid')
const config = require('./config').get().schedule
//every 5 mins
cron.schedule(config.checkStatus, async () => {
  try {
    await mailgun.checkStatus()
    await sendgrid.checkStatus()
  } catch (e) {
    console.log('e: ', e);
  }
})

exports.init = async () => {
  try {
    await mailgun.checkStatus()
    await sendgrid.checkStatus()
  } catch (e) {
    console.log('e: ', e);
  }
}