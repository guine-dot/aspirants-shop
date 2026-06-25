const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  link: String,
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', bannerSchema);
