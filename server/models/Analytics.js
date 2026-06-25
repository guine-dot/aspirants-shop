const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  totalUsers: Number,
  totalOrders: Number,
  totalRevenue: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
