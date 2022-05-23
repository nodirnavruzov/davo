const { body, query } = require('express-validator')

module.exports.patientCreateValidationRules = () => {
  return [
    body('address').isString().isLength({ max: 255 }),
    body(['name', 'surname']).exists().isString().isLength({ mix: 2, max: 255 }),
    body('birth_date').isString().isLength({  max: 25 }),
    body('gender').isString().isLength({  max: 10 }),
    body('phone').exists().isString().isLength({min: 13, max: 13}),
  ]
}

module.exports.patientByIdValidationRules = () => {
  return [
    query('id').exists().isInt()
  ]
}
