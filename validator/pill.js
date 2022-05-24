const { body, query } = require('express-validator')

module.exports.pillCreateValidationRules = () => {
  return [
    body(['name', 'type']).exists().isString().isLength({ max: 255 })
  ]
}


module.exports.pillByNameValidationRules = () => {
  return [
    query('name').exists().isString()
  ]
}

module.exports.pillByIdValidationRules = () => {
  return [
    query('id').exists()
  ]
}
