const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // login validation
  if (!email || !password) {
    return res.status(400).json({ msg: '!Please enter all login fields' });
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({ msg: '!Oops, user does not exist' });

    // validate pswd
    // password is the plaintext pswd in postman
    // user.password is the hashed db pswd
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: '!Oops, invalid credentials' });
      // stiff token with whatever u wanna for later use, secret key, exp[adDstyle -> *Hrs]
      jwt.sign(
        { id: user.id, email: user.email },
        config.get('JWT_SECRET'),
        { expiresIn: 3600 * 7 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Determine user
// @access  Protected
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // grab user data but pswd
    .then(user => res.json(user));
});
router.get('/whoami', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // redundant
    .then(user => res.json(user));
});


module.exports = router;
