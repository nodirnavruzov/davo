const { validationResult } = require('express-validator')

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  const errorArray = errors.array({ onlyFirstError: true }) 
  errorArray.map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(400).json({
    errors: extractedErrors,
  })
}