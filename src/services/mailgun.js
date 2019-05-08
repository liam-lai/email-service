const mailgunConfig = require('../config').mailgun
const helper = require('./helper')
const axios = require('axios')
var FormData = require('form-data')
const serviceStatus = { website: {}, lastSend: {} }

const options = {
  method: 'POST',
  auth: {
    username: mailgunConfig.apiKey.username,
    password: mailgunConfig.apiKey.password
  },
  url: mailgunConfig.url,
  timeout: mailgunConfig.timeout * 1000
}

const sendEmail = async (req) => {
  options.data = fillData(req)
  options.headers = { 'content-type': `multipart/form-data; boundary=${options.data._boundary}` }
  var result = 'fail'
  try {
    res = await axios(options)
    result = helper.getResult(res)
    helper.setSendingStatus(serviceStatus, result)
    return result
  }
  catch (e) {
    helper.setSendingStatus(serviceStatus, result)
    //LOG
    return result
  }
}

const getStatus = () => {
  return serviceStatus
}

const checkStatus = async () => {
  const options = {
    method: 'GET',
    url: mailgunConfig.status.url
  };
  res = await axios(options)
  helper.setStatus(serviceStatus, res.data.status, mailgunConfig.status)
}

const fillData = (req) => {
  const data = new FormData()
  data.append('from', mailgunConfig.sender)
  data.append('subject', req.body.subject)
  data.append('text', req.body.text)
  req.body.recipients.map((recipient) => {
    data.append('to', recipient)
  })
  req.body.ccs.map((cc) => {
    data.append('cc', cc)
  })
  req.body.bccs.map((bcc) => {
    data.append('bcc', bcc)
  })
  return data
}

module.exports = {
  sendEmail,
  getStatus,
  checkStatus
}