const express = require("express");
const Queue = require("../models/Queue");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// Add patient to queue
router.post(
    "/",
    protect,
    authorize("Patient", "PHC Staff"),
    async (req, res) => {
        try {

            // Find the latest token number
            const lastPatient = await Queue.findOne({
                doctor: req.body.doctor,
                hospital: req.body.hospital,
                status: { $ne: "Completed" }
            }).sort({ tokenNumber: -1 });

            let nextToken = 1;

            if (lastPatient) {
                nextToken = lastPatient.tokenNumber + 1;
            }

            const queueEntry = new Queue({
                patient: req.body.patient,
                doctor: req.body.doctor,
                hospital: req.body.hospital,
                tokenNumber: nextToken
            });

            const savedEntry = await queueEntry.save();

            res.status(201).json({
                message: "Patient added to queue",
                tokenNumber: nextToken,
                queue: savedEntry
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


// View queue
router.get(
    "/",
    protect,
    authorize("Doctor", "PHC Staff", "Hospital Admin"),
    async (req, res) => {
        try {

            const queue = await Queue.find({
                status: { $ne: "Completed" }
            })
            .populate("patient")
            .populate("doctor")
            .populate("hospital")
            .sort({ tokenNumber: 1 });

            res.json(queue);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


// Update queue status
router.put(
    "/:id/status",
    protect,
    authorize("Doctor", "PHC Staff"),
    async (req, res) => {
        try {

            const queueEntry = await Queue.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status
                },
                {
                    new: true
                }
            );

            if (!queueEntry) {
                return res.status(404).json({
                    message: "Queue entry not found"
                });
            }

            res.json({
                message: "Queue status updated",
                queue: queueEntry
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


module.exports = router;