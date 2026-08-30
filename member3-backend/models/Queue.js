const mongoose = require('mongoose');
const queueSchema = new mongoose.Schema({
  patientId: String,
  tokenNumber: Number,
  status: { type: String, default: 'Waiting' }
});
module.exports = mongoose.model('Queue', queueSchema);
