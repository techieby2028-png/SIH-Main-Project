const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allows frontend to make request calls
app.use(express.json());

app.use('/api/queue', require('./routes/queueRoutes'));
// Add Member 2 & Member 5 routes here as they deliver code:
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));

app.listen(5000, () => console.log('Backend running on port 5000'));