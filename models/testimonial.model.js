const mongoose = require('mongoose')

const { Schema } = mongoose

const testimonialsSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
  text: { type: String, required: true },
})

module.exports = mongoose.model('Testimonial', testimonialsSchema)
