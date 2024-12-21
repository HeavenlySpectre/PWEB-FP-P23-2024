// backend/scripts/populateUsername.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const DamageReport = require('../models/DamageReport');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/super_kos';

const populateUsername = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Cari semua laporan fasilitas yang username-nya kosong
    const reports = await DamageReport.find({ username: { $exists: false } });

    for (const report of reports) {
      if (report.user) {
        const user = await User.findById(report.user);
        report.username = user ? user.username : 'Tidak Diketahui';
      } else {
        report.username = 'Tidak Diketahui';
      }
      await report.save();
      console.log(`Updated report ${report._id} with username: ${report.username}`);
    }

    console.log('Username population completed.');
  } catch (error) {
    console.error('Error populating username:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Jalankan script migrasi
populateUsername();
