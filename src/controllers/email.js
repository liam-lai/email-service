const input = require('../middleware/validate')
const mailgun = require('../services/mailgun')
const sendgrid = require('../services/sendgrid')

exports.send = async (req, res) => {
  console.dir(req.body);
  try {
    const mailgunStatus = await mailgun.sendEmail(req)
    console.log('mailgunStatus: ', mailgunStatus);
    if (mailgunStatus == 200) {
      res.sendStatus(mailgunStatus)
      return
    }
    const sendgridStatus = await sendgrid.send(req)
    if (sendgridStatus == 'OK') {
      return
    }
  } catch (e) {
    res.sendStatus(503)
    return e
  }
}

/*
input.validate('send'),
    (req, res) => {
      req
        .getValidationResult() // to get the result of above validate fn
        .then(validationHandler())
        .then(() => {
          res.send('Hello World')
        })
        .catch(e => {
          res.send(e.toString())
        })
    }

const validationHandler = result => {
  console.log('result: ', result.array());
  if (result.isEmpty()) return
  console.log('Error');
  if (!next)
    throw new Error(
      result.array().map(i => `'${i.param}' has ${i.msg}`).join(' ')
    )
  else
    return next(
      new Error(
        result.array().map(i => `'${i.param}' has ${i.msg}`).join('')
      )
    )
}
*/