const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        },

        symptoms: {
            type: String,
            required: true
        },

        diagnosis: {
            type: String,
            required: true
        },

        prescription: {
            type: String
        },

        notes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Consultation", consultationSchema);