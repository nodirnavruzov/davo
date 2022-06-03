const { body, query } = require('express-validator')

module.exports.visitByIdValidationRules = () => {
  return [
    query('id').exists()
  ]
}

module.exports.visitCreateValidationRules = () => {
  return [
    body(['patient_id', 'doctor_id']).exists().isInt(),
    body('complaints').if(body('complaints').exists()).isString()
  ]
}
