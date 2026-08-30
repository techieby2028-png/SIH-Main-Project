const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

// Create doctor
router.post("/", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);

        const savedDoctor = await doctor.save();

        res.status(201).json({
            message: "Doctor created successfully",
            doctor: savedDoctor
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// Get all doctors
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find().populate("hospital");

        res.json(doctors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;