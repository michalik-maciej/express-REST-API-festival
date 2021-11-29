const express = require('express')

const router = express.Router()
const shortId = require('shortid')
const db = require('../db')
const { messages } = require('../settings')

/* GET requests */
router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
})

router.route('/concerts/:id').get((req, res) => {
  const result = db.concerts.filter(
    (record) => record.id === parseInt(req.params.id)
  )
  if (result.length) {
    res.json(...result)
  } else {
    res.status(404).json(messages.idNotFound(req.params.id))
  }
})

/* Post requests */
router.route('/concerts').post((req, res) => {
  const { author, text } = req.body

  if (author && text) {
    db.concerts.push({ id: shortId(), author, text })
    res.json(messages.success)
  } else {
    res.json(messages.fillInData)
  }
})

/* Put requests */
router.route('/concerts/:id').put((req, res) => {
  const { author, text } = req.body
  const selectedRecord = db.concerts.find(
    (record) => record.id === parseInt(req.params.id)
  )

  if (selectedRecord) {
    if (author && text) {
      Object.assign(selectedRecord, { author, text })
      res.json(messages.success)
    } else {
      res.status(404).json(messages.fillInData)
    }
  } else {
    res.status(404).json(messages.idNotFound(req.params.id))
  }
})

/* Delete requests */
router.route('/concerts/:id').delete((req, res) => {
  let recordFound = false
  db.concerts.forEach((record) => {
    if (record.id === parseInt(req.params.id)) {
      const index = db.concerts.indexOf(record)
      db.concerts.splice(index, 1)
      recordFound = true
    }
  })

  if (recordFound) {
    res.json(messages.success)
  } else {
    res.status(404).json(messages.idNotFound(req.params.id))
  }
})

module.exports = router
