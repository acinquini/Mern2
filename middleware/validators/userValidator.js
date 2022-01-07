const { check, validationResult } = require('express-validator');

const validateUser = [
  check('name')
    .trim()
    .not().isEmpty()
    .isLength({ min: 3 })
    .withMessage('Name is required'),
  check('email')
    .trim()
    .not().isEmpty()
    .isEmail()
    .withMessage('Valid email address required'),
  check('password')
    .not().isEmpty()
    .isLength({ min: 4 })
    .withMessage('Password must have at least 4 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
    return res.status(200);
  },
];

module.exports = validateUser;
