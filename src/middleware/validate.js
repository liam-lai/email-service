const { body } = require('express-validator/check')
exports.validate = (method) => {
  switch (method) {
    case 'send': {
      return [
        body('recipients', 'Invalid recipients').optional().isArray(),
        body('ccs', 'Invalid ccs email').optional().isArray(),
        body('bccs', 'Invalid bccs email').optional().isArray(),
        body('subject').not().isEmpty(),
        body('text').not().isEmpty()
      ]
    }
  }
}
