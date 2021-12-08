const 
  express = require('express'),
  { HandleCollection } = require('../controllers/main.controller'),
  Client = require('../models/client.model'),
  Testimonial = require('../models/testimonial.model'),
  router = express.Router(),
  handleTestimonials = new HandleCollection(Testimonial)

router.get('/testimonials', (req, res) => handleTestimonials.getAll({ req, res }))
router.get('/testimonials/random', (req, res) => handleTestimonials.getRandom({ req, res }))
router.get('/testimonials/:id', (req, res) => handleTestimonials.getById({ req, res }))
router.post('/testimonials', (req, res) => handleTestimonials.post({ req, res }))
router.put('/testimonials/:id', (req, res) => handleTestimonials.put({ req, res }))
router.delete('/testimonials/:id', (req, res) => handleTestimonials.delete({ req, res }))

module.exports = router
