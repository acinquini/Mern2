const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const read = async (req, res) => {
  try {
    const user = await (User.findById(req.user.id)).select('-password'); // do not present passwd in the response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server malfunction');
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    }

    // compare returns a promise so 'await'
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    }
    // As we use Monggose_id instead of _id
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
        res.json({ token });
        // eslint-disable-next-line comma-dangle
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }

  return res.status(200);
};

module.exports = {
  auth,
  read,
};
