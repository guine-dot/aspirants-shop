const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  icon: String,
  category: String,
  tags: [String],
  isActive: { type: Boolean, default: true },
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
