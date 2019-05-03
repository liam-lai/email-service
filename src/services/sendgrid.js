const config = require('../config').get()
const axios = require('axios')
var FormData = require('form-data')
var sendgridStatus = 'Pending'

exports.sendEmail = async (req) => {
  const data = new FormData()
  data.append('from', config.mailgun.sender)
  data.append('to', req.body.recipients)
  data.append('subject', req.body.subject)
  data.append('text', req.body.text)

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

exports.getStatus = () => {
  return sendgridStatus
}

const setStatus = (status) => {
  status.lastUpdate = new Date() + " UTC"
  status.url = config.sendgrid.statusPage
  sendgridStatus = status
}

exports.checkStatus = async () => {
  const options = {
    method: 'GET',
    url: config.sendgrid.statusUrl
  };
  res = await axios(options)
  setStatus(res.data.status)
}

req = {
  from: 'Excited User <mailgun@sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org>',
  to: 'liam.icheng.lai@gmail.com',
  subject: 'Hello',
  text: 'axios'
}

//sendEmail(req)
//getStatus()