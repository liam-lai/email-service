const input = require('../middleware/validate')
const mailService = require('../services')

exports.send = async (req, res) => {
  const mailServiceList = mailService.getList()

  var sendingStatus = 'fail'
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
  res.json({
    status: sendingStatus
  })
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