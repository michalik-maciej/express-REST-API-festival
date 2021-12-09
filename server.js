const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')
const settings = require('./settings')

/* Server config */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // config for Postman

/* Routes */
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

/* Connect to database */
mongoose.connect('mongodb+srv://halniak:xhbVR4GdzYi87jT@halniak-cluster.rnzwz.mongodb.net/NewWaveDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', () => {
  console.log(settings.messages.connected)
})

db.on('error', (err) => console.log(settings.messages.error(err)))

/* Run server */
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000')
})
