const express = require("express");
const Referral = require("../models/Referral");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();


// Create referral
// Only Doctor or PHC Staff can create
router.post(
    "/",
    protect,
    authorize("Doctor", "PHC Staff"),
    async (req, res) => {
        try {
            const referral = new Referral(req.body);

            const savedReferral = await referral.save();

            res.status(201).json({
                message: "Referral created successfully",
                referral: savedReferral
            });

        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
);


// Get all referrals
// Doctor, PHC Staff and Hospital Admin can view
router.get(
    "/",
    protect,
    authorize("Doctor", "PHC Staff", "Hospital Admin"),
    async (req, res) => {
        try {
            const referrals = await Referral.find()
                .populate("patient")
                .populate("doctor")
                .populate("fromHospital")
                .populate("toHospital");

            res.json(referrals);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


// Update referral status
// Only Hospital Admin can update
router.put(
    "/:id/status",
    protect,
    authorize("Hospital Admin"),
    async (req, res) => {
        try {
            const referral = await Referral.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status
                },
                {
                    new: true
                }
            );

            if (!referral) {
                return res.status(404).json({
                    message: "Referral not found"
                });
            }

            res.json({
                message: "Referral status updated",
                referral: referral
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
);


module.exports = router;