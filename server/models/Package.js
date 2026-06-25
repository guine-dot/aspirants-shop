const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  originalPrice: Number,
  description: String,
  badge: String,
  tier: { type: String, enum: ['basic', 'standard', 'premium', 'vip'] },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
