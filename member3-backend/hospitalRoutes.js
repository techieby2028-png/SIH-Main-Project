const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Create hospital
router.post("/", async (req, res) => {
    try {
        const hospital = new Hospital(req.body);

        const savedHospital = await hospital.save();

        res.status(201).json({
            message: "Hospital created successfully",
            hospital: savedHospital
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// Get all hospitals
router.get("/", async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.json(hospitals);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;