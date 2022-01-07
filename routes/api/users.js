const express = require('express');

const router = express.Router();
const userController = require('../../controllers/userController');
const validateUser = require('../../middleware/validators/userValidator');

// @route         GET api/users
// @description   test route
// @access        Public
router.get('/', (req, res) => res.send('User route'));

// @route         POST api/users
// @description   register user
// @access        public
router.post('/', validateUser, userController.create);

module.exports = router;
