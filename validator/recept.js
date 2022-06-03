const { body, query } = require('express-validator')

module.exports.receptCreateValidationRules = () => {
  return [
    body(['pill_id', 'patient_id', 'doctor_id', 'visit_id']).exists().isInt(),
    body('description').if(body('description').exists()).isString()
  ]
}
