const config = require('../config').get()
const axios = require('axios')
var FormData = require('form-data')
var mailgunStatus = 'Pending'

exports.sendEmail = async (req) => {
  const data = fillData(req)
  const options = {
    method: 'POST',
    headers: { 'content-type': `multipart/form-data; boundary=${data._boundary}` },
    data,
    auth: {
      username: config.mailgun.apiKey.username,
      password: config.mailgun.apiKey.password
    },
    url: config.mailgun.url,
    timeout: config.mailgun.timeout * 1000
  }
  try {
    res = await axios(options)
    return res.status
  }
  catch (e) {
    console.log(e)
    return e
  }
}

const fillData = (req) => {
  const data = new FormData()
  data.append('from', config.mailgun.sender)
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

exports.getStatus = () => {
  return mailgunStatus
}

const setStatus = (status) => {
  status.lastUpdate = new Date() + " UTC"
  status.url = config.mailgun.statusPage
  mailgunStatus = status
}

exports.checkStatus = async () => {
  const options = {
    method: 'GET',
    url: 'https://status.mailgun.com/api/v2/status.json'
  };
  res = await axios(options)
  setStatus(res.data.status)
}
