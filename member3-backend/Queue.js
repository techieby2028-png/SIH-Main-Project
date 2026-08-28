const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
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

        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            required: true
        },

        tokenNumber: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Waiting", "In Consultation", "Completed"],
            default: "Waiting"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Queue", queueSchema);