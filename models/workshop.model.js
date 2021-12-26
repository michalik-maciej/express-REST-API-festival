const mongoose = require('mongoose')
const { Schema } = mongoose

const workshopsSchema = new Schema({
  name: { type: String, required: true },
  concertId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Workshop', workshopsSchema) 