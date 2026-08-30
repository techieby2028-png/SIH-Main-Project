const mongoose = require('mongoose');
const medicalRecordSchema = new mongoose.Schema({
  patientId: String,
  diagnosis: String,
  prescription: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
