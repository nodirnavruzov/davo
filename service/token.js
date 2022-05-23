const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports.createToken = (payload) => {
  const { id, phone } = payload
  const token = jwt.sign({ id,phone }, keys.jwtSecretKey, { expiresIn: '12h' })
  return token
}