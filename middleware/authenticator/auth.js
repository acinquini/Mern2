const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token'); // Header Type (Set manually as key in Postman)

  // check for token (status 401 = not authorized)
  if (!token) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  // validate token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'invalid token' });
  }

  return res.status(200);
};

module.exports = auth;
