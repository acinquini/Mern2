const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const create = async (req, res) => {
  // destructuring so that we do not have to prefix with req.body
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    // sign the token, pass in payload, pass in secret, expiration (optional)
    // inside the callback, if we don't get an error, we send back the token
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 720000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // the answer is the token (user id crypted) if it is ok. See https://jwt.io/
      },
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }

  return res.status(200);
};

module.exports = {
  create,
};
