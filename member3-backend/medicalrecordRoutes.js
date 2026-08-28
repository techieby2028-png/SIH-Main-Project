
const express = require("express");
const MedicalRecord = require("../models/MedicalRecord");
const { protect } = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

const router = express.Router();


// ===============================
// FILE UPLOAD CONFIGURATION
// ===============================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({
    storage: storage
});


// ===============================
// CREATE MEDICAL RECORD
// ===============================

router.post(
    "/",
    protect,
    upload.single("medicalFile"),
    async (req, res) => {

        try {

            const medicalRecord = new MedicalRecord({

                patient: req.body.patient,

                consultation: req.body.consultation,

                diagnosis: req.body.diagnosis,

                prescription: req.body.prescription,

                notes: req.body.notes,

                fileName: req.file
                    ? req.file.originalname
                    : null,

                filePath: req.file
                    ? req.file.path
                    : null,

                fileType: req.file
                    ? req.file.mimetype
                    : null
            });


            const savedRecord = await medicalRecord.save();


            res.status(201).json({
                message: "Medical record created successfully",
                record: savedRecord
            });


        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }

    }
);


// ===============================
// GET ALL MEDICAL RECORDS
// ===============================

router.get(
    "/",
    protect,
    async (req, res) => {

        try {

            const records = await MedicalRecord.find()
                .populate("patient")
                .populate("consultation");

            res.json(records);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// ===============================
// GET ONE MEDICAL RECORD
// ===============================

router.get(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const record = await MedicalRecord.findById(req.params.id)
                .populate("patient")
                .populate("consultation");

            if (!record) {

                return res.status(404).json({
                    message: "Medical record not found"
                });

            }

            res.json(record);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// ===============================
// EXPORT ROUTER
// ===============================

module.exports = router;