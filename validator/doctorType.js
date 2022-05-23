const { body, query } = require('express-validator')

module.exports.doctorTypeCreateValidationRules = () => {
  return [
    body('type').isString()
  ]
}

module.exports.doctorTypeByNameValidationRules = () => {
  return [
    query('name').exists().isString()
  ]
}
