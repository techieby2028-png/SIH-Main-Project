const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    village: {
        type: String
    },

    gender: {
        type: String
    }
});

module.exports = mongoose.model("Patient", patientSchema);