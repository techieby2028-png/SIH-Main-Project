const express = require("express");
const Consultation = require("../models/Consultation");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// Create consultation - Doctor only
router.post(
    "/",
    protect,
    authorize("Doctor"),
    async (req, res) => {
        try {
            const consultation = new Consultation(req.body);

            const savedConsultation = await consultation.save();

            res.status(201).json({
                message: "Consultation created successfully",
                consultation: savedConsultation
            });

        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
);


// Get consultations of a patient
router.get(
    "/patient/:patientId",
    protect,
    async (req, res) => {
        try {
            const consultations = await Consultation.find({
                patient: req.params.patientId
            })
            .populate("doctor")
            .populate("appointment");

            res.json(consultations);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


module.exports = router;