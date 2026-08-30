const express = require("express");
const Patient = require('../models/Patient');

const router = express.Router();

// Create a patient
router.post("/", async (req, res) => {
    try {
        const patient = new Patient(req.body);

        const savedPatient = await patient.save();

        res.status(201).json({
            message: "Patient created successfully",
            patient: savedPatient
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// Get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();

        res.json(patients);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;