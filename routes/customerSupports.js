const express = require('express')
const router = express.Router()

const customerSupport = require('../Modals/customerSupport')


router.get('/test', (req, res) => res.send('customer Support route testing!'))


router.get('/', (req, res) => {
  customerSupport.find()
    .then((customerSupports) => res.json(customerSupports))
    .catch((err) =>
      res.status(404).json({ nofeedbacksfound: 'No User Feedbacks found' })
    )
})


router.get('/:id', (req, res) => {
  customerSupport.findById(req.params.id)
    .then((customerSupports) => res.json(customerSupports))
    .catch((err) =>
      res.status(404).json({ nofeedbackfound: 'No User Feedback found' })
    )
})


router.post('/', (req, res) => {
  customerSupport.create(req.body)
    .then((customerSupports) => res.json({ msg: 'User feedback added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this user feedback' })
    )
})


router.put('/:id', (req, res) => {
  customerSupport.findByIdAndUpdate(req.params.id, req.body)
    .then((customerSupports) => res.json({ msg: 'User feedback updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the user feedback' })
    )
})

router.delete('/:id', (req, res) => {
  customerSupport.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: 'User feedback entry deleted successfully' }))
    .catch((err) =>
      res.status(404).json({ error: 'No such user feedback found' })
    )
})

module.exports = router
