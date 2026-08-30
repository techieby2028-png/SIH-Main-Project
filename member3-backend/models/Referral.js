const mongoose = require('mongoose');
const referralSchema = new mongoose.Schema({
  patientId: String,
  referredTo: String,
  reason: String
});
module.exports = mongoose.model('Referral', referralSchema);
