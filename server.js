const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')
const clientsRoutes = require('./routes/clients.routes')
const settings = require('./settings')
const socket = require('socket.io')
const helmet = require('helmet')
require('dotenv').config()

/* Server config */
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // config for Postman

app.use((req, res, next) => {
  req.io = io
  next()
})

/* Routes */
app.use('/api', clientsRoutes)
app.use('/api', testimonialsRoutes)
app.use('/api', seatsRoutes)
app.use('/api', concertsRoutes)
app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

/* Not found 404 */
app.use((req, res) => {
  res.status(404).send(settings.messages.notFound)
})

/* Database config */
const { NODE_ENV, REMOTE_DB_URL } = process.env
let dbUri
if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest'
else dbUri = REMOTE_DB_URL

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', () => {
  console.log(settings.messages.connected)
})

db.on('error', (err) => console.log(settings.messages.error(err)))

/* Run server */
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000')
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log('connected ', socket.id)
})

module.exports = server
