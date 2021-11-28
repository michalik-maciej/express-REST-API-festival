<<<<<<< HEAD
const express = require('express')

const app = express()
const cors = require('cors')
const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')
const settings = require('./settings')

/* Middleware */
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false })) // config for Postman
app.use('/api', testimonialsRoutes)
app.use('/api', seatsRoutes)
app.use('/api', concertsRoutes)

/* Not found 404 */
app.use((req, res) => {
  res.status(404).send(settings.messages.notFound)
})

/* Run server */
app.listen(8000, () => {
  console.log(`server running on port 8000`)
})
=======
const express = require('express');
const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const settings = require('./settings');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //config for Postman
app.use('', testimonialsRoutes);
app.use('', seatsRoutes);
app.use('', concertsRoutes);

/* Not found 404 */
app.use((req, res) => {
  res.status(404).send(settings.messages.notFound);
});

/* Run server */
app.listen(3000, () => {
  console.log(`server running on port 3000`);
});
>>>>>>> b04c7b4a9f3a54c32f6fa80f5bd91b7dc253864a
