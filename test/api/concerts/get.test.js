const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../server')
const mongoose = require('mongoose')
const Seat = require('../../../models/seat.model')
const Concert = require('../../../models/concert.model')

chai.use(chaiHttp)
const { expect, request } = chai
console.log('typeof: ', process.env.NODE_ENV)
if (process.env.NODE_ENV.includes('test')) {
  describe('GET /api/concerts', () => {
    before(async () => {
      const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', image: 'src/test1.jpg', day: 1, price: 40, genre: 'rap', performer: 'Maxi Kaz' })
      await testConcertOne.save()
  
      const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', image: 'src/test2.jpg', day: 2, price: 50, genre: 'pop', performer: 'Trubadurzy' })
      await testConcertTwo.save()
  
      for (let i = 1; i <= 10; i++) {
        const testSeat = new Seat({ day: 1, seat: i, client: new mongoose.Types.ObjectId() })
        await testSeat.save()
      }
  
      for (let i = 1; i <= 3; i++) {
        const testSeat = new Seat({ day: 2, seat: i, client: new mongoose.Types.ObjectId() })
        await testSeat.save()
      }
    }) 
  
    it('should return all concerts', async () => {
      const res = await request(server).get('/api/concerts')
      expect(res.status).to.be.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })
  
    it('should return all concerts with proper tickets info', async () => {
      const res = await request(server).get('/api/concerts')
      res.body.forEach(concert => {
        expect(concert.tickets).to.exist
        expect(concert.tickets).to.be.a('number')
      })
      expect(res.body[0].tickets).to.be.equal(40)
      expect(res.body[1].tickets).to.be.equal(47)
    })
  
    after(async () => {
      await Concert.deleteMany()
      await Seat.deleteMany()
    })
  })
}