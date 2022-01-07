const { check, validationResult } = require('express-validator');

const validateAuthUser = [
  check('email')
    .not().isEmpty()
    .isEmail()
    .withMessage('Valid email address required'),
  check('password')
    .exists()
    .withMessage('Password required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
    return res.status(200);
  },
];

module.exports = validateAuthUser;
