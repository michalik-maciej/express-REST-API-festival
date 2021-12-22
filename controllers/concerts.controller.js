const { messages } = require('../settings')
const { HandleCollection } = require('./main.controller')
const Seat = require('../models/seat.model')

exports.HandleConcertsCollection = class HandleConcertsCollection extends HandleCollection {
  constructor(model) {
    super(model)
  }
 
  async getAll(args) {
    const { req, res } = args
    try {
      const concerts = await this.model.find()
      const seats = await Seat.find()
      const updatedConcerts = concerts.map(
        concert => ({
          ...concert._doc, 
          tickets: 50 - seats.filter(seat => seat.day === concert.day).length
        })
      )
      res.json(updatedConcerts)
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }
}
