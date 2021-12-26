const { messages } = require('../settings')
const { HandleCollection } = require('./main.controller')
const Seat = require('../models/seat.model')
const Workshop = require('../models/workshop.model')

exports.HandleConcertsCollection = class HandleConcertsCollection extends HandleCollection {
  constructor(model) {
    super(model)
  }
 
  async getAll(args) {
    const { req, res } = args
    try {
      const concerts = await this.model.find()
      const seats = await Seat.find()
      const workshops = await Workshop.find()

      const updatedConcerts = concerts.map(
        concert => ({
          ...concert._doc, 
          workshops: workshops.filter(item => item.concertId.equals(concert['_id'])),
          tickets: 50 - seats.filter(seat => seat.day === concert.day).length
        })
      )

      res.json(updatedConcerts)
    }
    catch (err) {
      console.log(err)
      res.status(500).json(messages.error(err))
    }
  }
}
