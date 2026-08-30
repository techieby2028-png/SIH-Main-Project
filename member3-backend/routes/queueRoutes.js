const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { patientName, reason } = req.body;

  try {
    // Send symptoms to Member 4's AI service (Port 8000)
    const aiResponse = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: reason })
    });

    const aiResult = await aiResponse.json(); 

    res.json({
      status: 'success',
      message: 'Added to queue',
      data: {
        patientName,
        reason,
        triagePriority: aiResult.priority || 'Normal',
        addedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    // Safe fallback if the AI Python server is offline
    res.json({
      status: 'success',
      message: 'Added to queue (AI Offline)',
      data: { 
        patientName: patientName || 'Anonymous', 
        reason: reason || 'Not specified', 
        triagePriority: 'Normal',
        addedAt: new Date().toISOString()
      }
    });
  }
});

module.exports = router;