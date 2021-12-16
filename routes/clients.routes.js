const 
  express = require('express'),
  { HandleClientsCollection } = require('../controllers/clients.controller'),
  Client = require('../models/client.model'),
  router = express.Router(),
  handleClients = new HandleClientsCollection(Client)

router.get('/clients', (req, res) => handleClients.getAll({ req, res }))
router.get('/clients/:id', (req, res) => handleClients.getById({ req, res }))
router.post('/clients', (req, res) => handleClients.post({ req, res }))
router.put('/clients/:id', (req, res) => handleClients.put({ req, res }))
router.delete('/clients/:id', (req, res) => handleClients.delete({ req, res }))

module.exports = router
