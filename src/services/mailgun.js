const config = require('../config').get()
const axios = require('axios')
var FormData = require('form-data')
var mailgunStatus = 'Pending'

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
    url: config.mailgun.url
  };
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
  return mailgunStatus
}

const setStatus = (status) => {
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

req = {
  from: 'Excited User <mailgun@sandboxe7fb8aecdc6547d88fa7ddbfd86d286f.mailgun.org>',
  to: 'liam.icheng.lai@gmail.com',
  subject: 'Hello',
  text: 'axios'
}

//sendEmail(req)

//getStatus()