const mailService = require('../services')

exports.send = async (req, res) => {
  const mailServiceList = mailService.getList()

  var sendingStatus = 'error'
  for (var i in mailServiceList) {
    resource = mailServiceList[i]
    try {
      const status = await resource.sendEmail(req)
      if (status === 'ok') {
        sendingStatus = status
        break
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }
  if (sendingStatus === 'ok') {
    res.json({
      status: sendingStatus
    })
  } else {
    res.status(500).json({
      status: 'error'
    })
  }
}
