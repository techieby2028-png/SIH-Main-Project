const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation"
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
    },

    fileName: {
        type: String
    },

    filePath: {
        type: String
    },

    fileType: {
        type: String
    }
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);