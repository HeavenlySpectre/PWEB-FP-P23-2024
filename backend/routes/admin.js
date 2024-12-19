// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const Room = require('../models/Room');
const Payment = require('../models/Payment');
const User = require('../models/User'); // Impor User

// Route untuk mendapatkan data okupansi
router.get('/occupancy', auth, adminCheck, async (req, res) => {
  try {
    const rooms = await Room.find();
    const occupied = rooms.filter(room => room.is_occupied).length;
    const empty = rooms.length - occupied;
    
    res.json({ empty, filled: occupied });
  } catch (error) {
    console.error('Error fetching occupancy:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route untuk mendapatkan detail penghuni
router.get('/penghuni/:id', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const payment = await Payment.findOne({ user: req.params.id });
    
    res.json({
      username: user.username,
      payment: payment
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

router.delete('/penghuni/:id', auth, adminCheck, async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Cari dan hapus pengguna
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hapus pembayaran terkait
      await Payment.findOneAndDelete({ user: userId });
  
      // Jika ada data lain yang terkait, hapus juga sesuai kebutuhan
  
      res.json({ message: 'Penghuni berhasil dihapus' });
    } catch (error) {
      console.error('Error deleting penghuni:', error);
      res.status(500).json({ message: 'Error deleting penghuni', error });
    }
  });

module.exports = router;
