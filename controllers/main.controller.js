const { messages } = require('../settings')

exports.HandleCollection = class HandleCollection {
  constructor(model) {
    this.model = model
  }

  async getAll(args) {
    const { req, res } = args
    try {
      res.json(await this.model.find().populate('client'))
    }
    catch(err) {
      res.status(500).json(messages.error(err))
    }
  }
  
  async getRandom(args) {
    const { req, res } = args
    try {
      const randomSample = await this.model.aggregate([{ $sample: { size: 1 } }])
      res.json(randomSample) 
    }
    catch(err) {
      res.status(500).json(messages.error(err))
    }
  }

  async getById(args){
    const { req, res } = args
    try {
      const result = await this.model.findById(req.params.id).populate('client')
      if (result) {
        res.json(result)
      }
      else {
        res.status(404).json(messages.notFound)
      }
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }

  async post(args) {
    const { req, res } = args
    try {
      const newRecord = new this.model(req.body)
      await newRecord.save()
      res.json(messages.success)
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }

  async put(args) {
    const { req, res } = args
    try {
      let record = await this.model.findById(req.params.id)
      if (record) {
        await this.model.updateOne({ _id: req.params.id}, { $set: req.body })
        res.json(messages.success)
      }
      else {
        res.status(404).json(messages.notFound)
      }
    }
    catch (err) {
      res.status(500).json(messages.error(err))
    }
  }

  async delete(args) {
    const { req, res } = args
    try {
      const record = await this.model.findById(req.params.id)
      if (record) {
        await record.remove()
        res.json(messages.deleted(record))
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
