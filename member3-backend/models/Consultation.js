const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  notes: String,
  status: { type: String, default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationSchema);
