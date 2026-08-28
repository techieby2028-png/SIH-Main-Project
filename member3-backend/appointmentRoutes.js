const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();


// Book appointment
router.post("/", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);

        const savedAppointment = await appointment.save();

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: savedAppointment
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// Get all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient")
            .populate("doctor");

        res.json(appointments);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Cancel appointment
router.put("/:id/cancel", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: "Cancelled" },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.json({
            message: "Appointment cancelled",
            appointment
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;