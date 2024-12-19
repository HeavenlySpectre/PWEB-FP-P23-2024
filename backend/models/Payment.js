const mongoose = require('mongoose');

const invoiceHistorySchema = new mongoose.Schema({
  bill: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total_bill: { type: Number, required: true },
  payment_method: { type: String, enum: ['QRIS', 'BANK_TRANSFER'], required: true },
  rent_periods: { type: Number, enum: [3, 6], required: true },
  invoice_history: [invoiceHistorySchema]
});

module.exports = mongoose.model('Payment', paymentSchema);