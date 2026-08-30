const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  date: Date,
  status: { type: String, default: 'Scheduled' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
