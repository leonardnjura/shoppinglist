const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Fetch all items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   GET api/items/shopping/:yyyy/:mm/:dd
// @desc    TODO: Fetch all items in specified day
// @access  Public
router.get('/shopping/:yyyy/:mm/:dd', (req, res) => {
  var data = {
    shoppingDay: {
      yyyy: req.params.yyyy,
      mm: req.params.mm,
      dd: req.params.dd
    }
  };
  res.json(data);
});

// @route   POST api/items
// @desc    Create an item
// @access  Protected
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
  res.status(201);
});

// @route   DELETE api/items/:id
// @desc    Chuck an item
// @access  Protected
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .remove()
        .then(() =>
          res.status(204).json({ success: true, msg: 'Item deleted' })
        )
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
