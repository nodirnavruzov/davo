const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, keys.jwtSecretKey, (err, doc) => {
          if (err) {
              return res.status(403).json({Error: err});
          }

          req.doctor = doc;
          next();
      });
  } else {
      res.status(401).json({Error: 'Error authorization headers'});
  }
};


