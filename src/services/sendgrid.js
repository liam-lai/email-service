const vender = 'sendgrid'
const sendgridConfig = require('../config').sendgrid
const axios = require('../axios-client')
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
  var result = 'error'
  try {
    res = await axios.client(options)
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

const getVender = () => {
  return vender
}

const getStatus = () => {
  return serviceStatus
}

const checkStatus = async () => {
  const options = {
    method: 'GET',
    url: sendgridConfig.status.url
  };
  try {
    res = await axios.client(options)
    helper.setStatus(serviceStatus, res.data.status, sendgridConfig.status)
  } catch (e) {
    console.log('e: ', e);
    serviceStatus.status = 'error'
  }
}

const fillData = (req) => {
  const data = {
    personalizations: [{ to: [] }],
    from: { email: sendgridConfig.sender },
    subject: req.body.subject,
    content: [{ type: "text/plain", value: req.body.text }]
  }

  req.body.recipients.map((recipient) => {
    data.personalizations[0].to.push({ email: recipient })
  })

  if (req.body.ccs != undefined && req.body.ccs.length > 0) {
    data.personalizations[0].cc = []
    req.body.ccs.map((cc) => {
      data.personalizations[0].cc.push({ email: cc })
    })
  }

  if (req.body.bccs != undefined && req.body.bccs.length > 0) {
    data.personalizations[0].bcc = []
    req.body.bccs.map((bcc) => {
      data.personalizations[0].bcc.push({ email: bcc })
    })
  }
  return data
}

module.exports = {
  sendEmail,
  getVender,
  getStatus,
  checkStatus
}