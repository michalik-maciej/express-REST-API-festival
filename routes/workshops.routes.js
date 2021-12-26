const 
  express = require('express'),
  { HandleCollection } = require('../controllers/main.controller'),
  Workshop = require('../models/workshop.model'),
  router = express.Router(),
  handleWorkshops = new HandleCollection(Workshop)

router.get('/workshops', (req, res) => handleWorkshops.getAll({ req, res }))
router.post('/workshops', (req, res) => handleWorkshops.post({ req, res }))

module.exports = router
