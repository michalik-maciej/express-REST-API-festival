const
  mongoose = require('mongoose'),
  { Schema } = mongoose

const testimonialsSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
})

module.exports = mongoose.model('Testimonial', testimonialsSchema)
