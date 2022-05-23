const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.hashPass = (pass) => {
  const hashedPassword = bcrypt.hash(pass, saltRounds)
  return hashedPassword
};


module.exports.comparePass = async (payload) => {
  try {
    return bcrypt.compare(payload.password, payload.hash)
  } catch (error) {
    return error
  }
};

