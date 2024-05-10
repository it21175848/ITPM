const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    seat: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parking', parkingSchema);
