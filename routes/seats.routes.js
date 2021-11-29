const express = require('express')

const router = express.Router()
const shortId = require('shortid')
const db = require('../db')
const { messages } = require('../settings')

/* GET requests */
router.route('/seats').get((req, res) => {
  res.json(db.seats)
})

router.route('/seats/:id').get((req, res) => {
  const result = db.seats.filter(
    (record) => record.id === parseInt(req.params.id)
  )
  if (result.length) {
    res.json(...result)
  } else {
    res.status(404).json(messages.idNotFound(req.params.id))
  }
})

/* Post requests */
router.route('/seats').post((req, res) => {
  const { client, email, day, seat } = req.body
  let seatTaken = false

  db.seats.forEach((booking) => {
    if (booking.seat === seat && booking.day === day) {
      res.status(409).json(messages.seatTaken)
      seatTaken = true
    }
  })

  if (client && email && day && seat) {
    if (!seatTaken) {
      db.seats.push({ id: shortId(), ...req.body })
      res.json(messages.success)
    }
  } else {
    res.json(messages.fillInData)
  }
})

/* Put requests */
router.route('/seats/:id').put((req, res) => {
  const { client, email, day, seat } = req.body
  const selectedRecord = db.seats.find(
    (record) => record.id === parseInt(req.params.id)
  )

  if (selectedRecord) {
    if (client && email && day && seat) {
      Object.assign(selectedRecord, req.body)
      res.json(messages.success)
    } else {
      res.status(404).json(messages.fillInData)
    }
  } else {
    res.status(404).json(messages.idNotFound(req.params.id))
  }
})

/* Delete requests */
router.route('/seats/:id').delete((req, res) => {
  let recordFound = false
  db.seats.forEach((record) => {
    if (record.id === parseInt(req.params.id)) {
      const index = db.seats.indexOf(record)
      db.seats.splice(index, 1)
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
