const { messages } = require('../settings')
const { HandleCollection } = require('./main.controller')

exports.HandleClientsCollection = class HandleClientsCollection extends HandleCollection {
  constructor(model) {
    super(model)
  }
 
  async post(args) {
    const { req, res } = args
    try {
      req.body.firstName = req.body.client.split(' ')[0],
      req.body.lastName = req.body.client.split(' ')[1],
      delete req.body.client
      const newRecord = new this.model(req.body)
      await newRecord.save()
      res.json(newRecord)
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }
}
