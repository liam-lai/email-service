var cron = require('node-cron')
const mailgun = require('./services/mailgun')
const sendgrid = require('./services/sendgrid')
//every 5 mins
cron.schedule('0 */5 * * * *', async () => {
  console.log('checkStatus');
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