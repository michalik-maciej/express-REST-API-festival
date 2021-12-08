const mongoose = require('mongoose')

const { Schema } = mongoose

const clientsSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
})

module.exports = mongoose.model('Client', clientsSchema)
