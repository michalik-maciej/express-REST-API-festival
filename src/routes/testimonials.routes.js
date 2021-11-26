const express = require('express');
const router = express.Router();
const db = require('../db');
const { messages } = require('../settings');
const shortId = require('shortid');


/* GET requests */
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  const result = db.testimonials.filter(record => record.id === parseInt(req.params.id));
  if (result.length) {
    res.json(...result);
  }
  else {
    res.status(404).json(messages.idNotFound(req.params.id));
  }
});


/* Post requests */
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.testimonials.push({ id: shortId(), author, text });
    res.json(messages.success);
  }
  else {
    res.json(messages.fillInData);
  }
});


/* Put requests */
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const selectedRecord = db.testimonials.find(record => record.id === parseInt(req.params.id));

  if (selectedRecord) {
    if (author && text) {
      Object.assign(selectedRecord, { author, text });
      res.json(messages.success);
    }
    else {
      res.status(404).json(messages.fillInData);
    }
  }
  else {
    res.status(404).json(messages.idNotFound(req.params.id));
  }  
});


/* Delete requests */
router.route('/testimonials/:id').delete((req, res) => {
  let recordFound = false;
  for (const record of db.testimonials) {
    if (record.id === parseInt(req.params.id)) {
      const index = db.testimonials.indexOf(record);
      db.testimonials.splice(index, 1);
      recordFound = true
    }
  };

  if (recordFound) {
    res.json(messages.success);
  }
  else {
    res.status(404).json(messages.idNotFound(req.params.id));
  }
});

module.exports = router;
