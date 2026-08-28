const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const referralRoutes = require("./routes/referralRoutes");
const authRoutes = require("./routes/authRoutes");
const queueRoutes = require("./routes/queueRoutes");

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);

app.get("/", (req, res) => {
    res.send("Healthcare Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});