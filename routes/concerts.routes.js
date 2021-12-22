const 
  express = require('express'),
  { HandleConcertsCollection } = require('../controllers/concerts.controller'),
  Concert = require('../models/concert.model'),
  router = express.Router(),
  handleConcerts = new HandleConcertsCollection(Concert)

router.get('/concerts', (req, res) => handleConcerts.getAll({ req, res }))
router.get('/concerts/:id', (req, res) => handleConcerts.getById({ req, res }))
router.post('/concerts', (req, res) => handleConcerts.post({ req, res }))
router.put('/concerts/:id', (req, res) => handleConcerts.put({ req, res }))
router.delete('/concerts/:id', (req, res) => handleConcerts.delete({ req, res }))

module.exports = router
