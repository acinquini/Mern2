const express = require('express');

const router = express.Router();

const auth = require('../../middleware/authenticator/auth');
const validateAuthUser = require('../../middleware/validators/authUserValidator');

const authController = require('../../controllers/authController');

// @route         GET api/auth
// @description   give token, get data
// @access        protected
router.get('/', auth, authController.read);

// @route         POST api/auth
// @description   authenticate user and get token
// @access        public
router.post('/', validateAuthUser, authController.auth);

module.exports = router;
