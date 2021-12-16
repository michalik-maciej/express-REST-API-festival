const { messages } = require('../settings')
const { HandleCollection } = require('./main.controller')

exports.HandleSeatsCollection = class HandleSeatsCollection extends HandleCollection {
  constructor(model) {
    super(model)
  }
  
  async seatTaken({ seat, day }) {
    try {
      const records = await this.model.find()
      return records.some(
        record => 
          record.seat === parseInt(seat) && 
          record.day === parseInt(day)
      )
    }
    catch (err) {
      console.log('error in seatTaken', err)
    }
  }  

  async post(args) {
    const { req, res } = args
    try {
      const isTaken = await this.seatTaken(req.body)
      if (isTaken) {
        res.status(409).json(messages.seatTaken)
      }
      else {
        const newRecord = new this.model(req.body)
        await newRecord.save()
        const seats = await this.model.find()
        req.io.emit('seatsUpdated', seats)
        res.json(messages.success)
      }
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }

  async put(args) {
    const { req, res } = args
    try {
      let record = await this.model.findById(req.params.id)
      if (record && (req.body.seat || req.body.day)) {
        const isTaken = await this.seatTaken({ day: record.day, seat: record.seat, ...req.body })
        if (isTaken) {
          res.status(409).json(messages.seatTaken)          
        }
        else {
          await this.model.updateOne({ _id: req.params.id}, { $set: req.body })
          res.json(messages.success)
        }
      }
      else {
        res.status(404).json(messages.notFound)
      }
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }
}
