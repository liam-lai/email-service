const Joi = require('joi')
const config = require('../config')

module.exports = {
  send: {
    body: {
      recipients: Joi.array().min(1).required().items(Joi.string().email()),
      ccs: Joi.array().optional().items(Joi.string().email()),
      bccs: Joi.array().optional().items(Joi.string().email()),
      subject: Joi.string().max(config.subjectLength).required(),
      text: Joi.string().max(config.textLength).required()
    }
  }
}