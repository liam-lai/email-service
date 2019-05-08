const sendgridConfig = require('../config').sendgrid
const axios = require('axios')
const helper = require('./helper')
const serviceStatus = { website: {}, lastSend: {} }

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${sendgridConfig.apiKey.bearer}`
  },
  url: sendgridConfig.url,
  timeout: sendgridConfig.timeout * 1000
}

const sendEmail = async (req) => {
  options.data = fillData(req)
  var result = 'fail'
  try {
    res = await axios(options)
    result = helper.getResult(res)
    helper.setSendingStatus(serviceStatus, result)
    return result
  }
  catch (e) {
    helper.setSendingStatus(serviceStatus, result)
    console.log(e)
    return result
  }
}

const getStatus = () => {
  return serviceStatus
}

const checkStatus = async () => {
  const options = {
    method: 'GET',
    url: sendgridConfig.status.url
  };
  res = await axios(options)
  helper.setStatus(serviceStatus, res.data.status, sendgridConfig.status)
}

const fillData = (req) => {
  const body = {}
  body.personalizations = [{ to: [] }]
  body.from = { email: sendgridConfig.sender }
  body.subject = req.body.subject
  body.content = [{ type: "text/plain", value: req.body.text }]

  req.body.recipients.map((recipient) => {
    body.personalizations[0].to.push({ email: recipient })
  })

  if (req.body.ccs.length > 0) {
    body.personalizations[0].cc = []
    req.body.ccs.map((cc) => {
      body.personalizations[0].cc.push({ email: cc })
    })
  }

  if (req.body.bccs.length > 0) {
    body.personalizations[0].bcc = []
    req.body.bccs.map((bcc) => {
      body.personalizations[0].bcc.push({ email: bcc })
    })
  }
  return body
}

module.exports = {
  sendEmail,
  getStatus,
  checkStatus
}