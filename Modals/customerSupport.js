const mongoose = require('mongoose')

const customerSupportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
})

module.exports = customerSupport = mongoose.model(
  'customerSupport',
  customerSupportSchema
)
