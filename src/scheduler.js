var cron = require('node-cron')
const mailgun = require('./services/mailgun')

//every 5 mins
cron.schedule('0 */5 * * * *', async () => {
  console.log('checkStatus');
  try {
    await mailgun.checkStatus()
  } catch (e) {
    console.log('e: ', e);
  }
})

exports.init = async () => {
  try {
    await mailgun.checkStatus()
  } catch (e) {
    console.log('e: ', e);
  }
}