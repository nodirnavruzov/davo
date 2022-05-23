const { 
  query,
  body,
} = require('express-validator')

module.exports.doctorByIdValidationRules = () => {
  return [
    query('id').exists().isInt(),
  ]
}

module.exports.doctorRegisterValidationRules = () => {
  return [
    body(['name', 'surname', 'hospital', 'password']).isString().isLength({min: 2, max: 50}),
    body('phone').isString().isLength({min: 13, max: 13}),
    body('doctor_type').exists().isInt()
  ]
}

module.exports.doctorLoginValidationRules = () => {
  return [
    body(['phone', 'password']).exists().isString(),
    body('phone').isLength({min: 13, max: 13}),
    body('password').isLength({min: 2, max: 50})
  ]
}

