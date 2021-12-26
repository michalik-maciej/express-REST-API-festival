const Workshop = require('../../models/workshop.model')
const mongoose = require('mongoose')
const { expect } = require('chai')

if (process.env.NODE_ENV.includes('test')) {
  describe('Workshop', () => {
    it('should throw an error without required fields', () => {
      const testWorkshop = new Workshop({})
      testWorkshop.validate((err) => {
        ['concertId', 'name'].forEach(prop => expect(err.errors[prop]).to.exist
        )      
      })
    })
  
    it('should throw an error if `name` is not a string', () => {
      const cases = [{}, []]
      cases.forEach((name) => {
        const testWorkshop = new Workshop({ name })
        testWorkshop.validate((err) => expect(err.errors.name).to.exist)
      })
    })
  
    it('should throw an error if `concertId` is not an ObjectId', () => {
      const cases = ['test', {}, []]
      cases.forEach((concertId) => {
        const testWorkshop = new Workshop({ concertId })
        testWorkshop.validate((err) => expect(err.errors.concertId).to.exist)
      })
    })
  
    it('should not throw an error if data is correct', () => {
      const testWorkshop = new Workshop({ name: 'Test text', concertId: new mongoose.Types.ObjectId() })
      testWorkshop.validate((err) => expect(err).not.to.exist)
    })
  })
}
