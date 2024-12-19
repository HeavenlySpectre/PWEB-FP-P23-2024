const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI;

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' }
});

// Define the InvoiceHistory schema
const invoiceHistorySchema = new mongoose.Schema({
  bill: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
  total_bill: { type: Number, required: true },
  payment_method: { type: String, enum: ['QRIS', 'BANK_TRANSFER'], required: true },
  rent_periods: { type: Number, required: true } // 3 or 6 months
});

// Define the DamageReporting schema
const damageReportingSchema = new mongoose.Schema({
  user: userSchema,
  message: { type: String, required: true }
});

// Define the UserReport schema
const userReportSchema = new mongoose.Schema({
  message: { type: String, required: true }
});

// Define the RoomOccupancy schema
const roomOccupancySchema = new mongoose.Schema({
  empty: { type: Number, required: true },
  filled: { type: Number, required: true }
});

// Define the UserDetail schema
const userDetailSchema = new mongoose.Schema({
  user: userSchema,
  invoice_history: invoiceHistorySchema
});

// Create models
const User = mongoose.model('User ', userSchema);
const InvoiceHistory = mongoose.model('InvoiceHistory', invoiceHistorySchema);
const Payment = mongoose.model('Payment', paymentSchema);
const DamageReporting = mongoose.model('DamageReporting', damageReportingSchema);
const UserReport = mongoose.model('User Report', userReportSchema);
const RoomOccupancy = mongoose.model('RoomOccupancy', roomOccupancySchema);
const UserDetail = mongoose.model('User Detail', userDetailSchema);

// Sample data
const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await InvoiceHistory.deleteMany({});
    await Payment.deleteMany({});
    await DamageReporting.deleteMany({});
    await UserReport.deleteMany({});
    await RoomOccupancy.deleteMany({});
    await UserDetail.deleteMany({});

    // Create sample users
    const hashedPassword = await bcrypt.hash('adminpass', 10); // Hash the password
    const adminUser  = new User({ username: 'admin', password: hashedPassword, role: 'ADMIN' });
    const regularUser  = new User({ username: 'user', password: hashedPassword, role: 'USER' });

    await adminUser .save();
    await regularUser .save();

    // Create sample invoice history
    const invoiceHistory = new InvoiceHistory({ bill: 100, created_at: new Date() });
    await invoiceHistory.save();

    // Create sample payment
    const payment = new Payment({ total_bill: 100, payment_method: 'QRIS', rent_periods: 3 });
    await payment.save();

    // Create sample damage reporting
    const damageReport = new DamageReporting({ user: adminUser , message: 'Damage in room 101' });
    await damageReport.save();

    // Create sample user report
    const userReport = new UserReport({ message: 'User  feedback' });
    await userReport.save();

    // Create sample room occupancy
    const roomOccupancy = new RoomOccupancy({ empty: 5, filled: 10 });
    await roomOccupancy.save();

    // Create sample user detail
    const userDetail = new UserDetail({ user: regularUser , invoice_history: invoiceHistory });
    await userDetail.save();

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedData();