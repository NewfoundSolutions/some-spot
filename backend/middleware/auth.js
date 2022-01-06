const config = require('config');
const jwt = require('jsonwebtoken');



const auth = function(req, res, next) {
  const accessToken = req.cookies.token;  if (!accessToken) {
    res.status(401).send('Unauthorized: No token');
  } else {
    jwt.verify(accessToken, config.get('JWT_SECRET'), function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = auth;