const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Event Model
const Event = require('../../models/Event');

// @route GET api/event
// @desc Get the event name
// @access Public
router.get('/', (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(event => res.json(event[0]))
});


// @route POST api/event
// @desc Post/Update an event
// @access Private
router.post('/', auth, (req, res) => {

  const { _id, name, date } = req.body;

  var query = {'_id': _id };

  if (_id) {
    Event.findOneAndUpdate(query, {name: name, date: date}, { upsert: true }, (err, event) => {
      if (err) return res.status(500).json({ error: err });
                                                                                                       return res.json({success: true});
                                                                                              })
  } else {
    const newEvent = new Event({
      name: name,
      date: date});

    newEvent.save().then(event => res.json(event));
  };

})

module.exports = router;
