const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Fetch all users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: '!Please enter all required fields' });
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({ msg: '!Oops, user already exists' });
    //else
    const newUser = new User({
      name,
      email,
      password
    });

    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // stiff token with whatever u wanna for later use, secret key, exp[adDstyle -> *Hrs]
          jwt.sign(
            { id: user.id, email: user.email },
            config.get('JWT_SECRET'),
            { expiresIn: 3600 * 1 },
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
  });
});

// @route   DELETE api/items/:id
// @desc    Chuck a user
// @access  Public
router.delete('/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user.remove().then(() => res.status(204).json({ success: true, msg: 'User deleted' }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
