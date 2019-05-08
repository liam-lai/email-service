const vender = 'mailgun'
const mailgunConfig = require('../config').mailgun
const helper = require('./helper')
const axios = require('../axios-client')
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
  var result = 'error'
  try {
    res = await axios.client(options)
    result = helper.getResult(res)
    helper.setSendingStatus(serviceStatus, result)
    return result
  }
  catch (e) {
    //Todo Log error
    console.log('e: ', e)
    helper.setSendingStatus(serviceStatus, result)
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
    url: mailgunConfig.status.url
  }
  try {
    res = await axios.client(options)
    helper.setStatus(serviceStatus, res.data.status, mailgunConfig.status)
  } catch (e) {
    console.log('e: ', e)
    serviceStatus.status = 'error'
  }
}

const fillData = (req) => {
  const data = new FormData()
  data.append('from', mailgunConfig.sender)
  data.append('subject', req.body.subject)
  data.append('text', req.body.text)
  req.body.recipients.map((recipient) => {
    data.append('to', recipient)
  })
  if (req.body.ccs != undefined && req.body.ccs.length > 0) {
    req.body.ccs.map((cc) => {
      data.append('cc', cc)
    })
  }
  if (req.body.bccs != undefined && req.body.bccs.length > 0) {
    req.body.bccs.map((bcc) => {
      data.append('bcc', bcc)
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