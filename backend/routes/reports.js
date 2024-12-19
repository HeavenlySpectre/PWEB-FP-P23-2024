const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const DamageReport = require('../models/DamageReport');
const UserReport = require('../models/UserReport');

// Get all facility reports
router.get('/facility', auth, adminCheck, async (req, res) => {
  try {
    const reports = await DamageReport.find()
      .populate('user', 'username')
      .sort({ created_at: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facility reports', error });
  }
});

// Get all user reports
router.get('/user', auth, adminCheck, async (req, res) => {
  try {
    const reports = await UserReport.find()
      .sort({ created_at: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user reports', error });
  }
});

// Update facility report status
router.patch('/facility/:id', auth, adminCheck, async (req, res) => {
  try {
    const { status } = req.body;
    const report = await DamageReport.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'username');
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error });
  }
});

// Create new facility report
router.get('/facility', auth, adminCheck, async (req, res) => {
    try {
      // Mengambil semua laporan dan mempopulasi field 'user'
      const reports = await Report.find()
        .populate('user', 'username') // Memasukkan field 'username' dari user
        .exec();
      
      res.json(reports);
    } catch (error) {
      console.error('Error fetching facility reports:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Create new user report (anonymous)
router.post('/user', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const report = new UserReport({
      message,
      created_at: new Date()
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user report', error });
  }
});

module.exports = router;
