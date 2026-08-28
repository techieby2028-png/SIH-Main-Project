const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    hospital: String,
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);