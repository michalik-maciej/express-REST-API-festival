const 
  express = require('express'),
  { HandleSeatsCollection } = require('../controllers/seats.controller'),
  Client = require('../models/client.model'),
  Seat = require('../models/seat.model'),
  router = express.Router(),
  handleSeats = new HandleSeatsCollection(Seat)

router.get('/seats', (req, res) => handleSeats.getAll({ req, res }))
router.get('/seats/:id', (req, res) => handleSeats.getById({ req, res }))
router.post('/seats', (req, res) => handleSeats.post({ req, res }))
router.put('/seats/:id', (req, res) => handleSeats.put({ req, res }))
router.delete('/seats/:id', (req, res) => handleSeats.delete({ req, res }))

module.exports = router
