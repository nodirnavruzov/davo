const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%@')

module.exports.generateShorID = () => {
  return shortid.generate().toUpperCase()
}