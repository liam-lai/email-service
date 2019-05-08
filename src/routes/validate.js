const Joi = require('joi')

module.exports = {
  send: {
    body: {
      recipients: Joi.array().min(1).required().items(Joi.string().email()),
      ccs: Joi.array().optional().items(Joi.string().email()),
      bccs: Joi.array().optional().items(Joi.string().email()),
      subject: Joi.string().max(50).required(),
      text: Joi.string().max(50000).required()
    }
  }
};