var cron = require('node-cron')
const mailgun = require('./services/mailgun')
const sendgrid = require('./services/sendgrid')
const config = require('./config').schedule
//every 5 mins
cron.schedule(config.checkStatus, async () => {
  //TODO Promise ALL
  try {
    await mailgun.checkStatus()
    await sendgrid.checkStatus()
  } catch (e) {
    console.log('e: ', e)
  }
})

exports.init = async () => {
  //TODO Promise ALL
  try {
    await mailgun.checkStatus()
    await sendgrid.checkStatus()
  } catch (e) {
    console.log('e: ', e)
  }
}