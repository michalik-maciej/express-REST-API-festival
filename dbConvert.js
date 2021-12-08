const fs = require('fs')
const db = require('./db')

db.seats.forEach((record) => {
  db.clients.push({
    firstName: record.client.split(' ')[0],
    lastName: record.client.split(' ')[1],
    email: record.email,
  })
  delete record.email
})

Object.keys(db).forEach((key) => {
  fs.writeFile(
    `./db_${key}.json`,
    JSON.stringify(db[key], undefined, 2),
    'utf8',
    (err) => {
      if (err) throw err
    }
  )
})
