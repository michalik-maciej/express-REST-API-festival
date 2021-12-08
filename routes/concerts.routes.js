const 
  express = require('express'),
  { HandleCollection } = require('../controllers/main.controller'),
  Concert = require('../models/concert.model'),
  router = express.Router(),
  handleConcerts = new HandleCollection(Concert)

router.get('/concerts', (req, res) => handleConcerts.getAll({ req, res }))
router.get('/concerts/:id', (req, res) => handleConcerts.getById({ req, res }))
router.post('/concerts', (req, res) => handleConcerts.post({ req, res }))
router.put('/concerts/:id', (req, res) => handleConcerts.put({ req, res }))
router.delete('/concerts/:id', (req, res) => handleConcerts.delete({ req, res }))

module.exports = router
