const mongoose = require('mongoose')

const { Schema } = mongoose

const seatsSchema = new Schema({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: Schema.Types.ObjectId, required: true, ref: 'Client' },
})

module.exports = mongoose.model('Seat', seatsSchema)
