const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  quantity: { type: Number, default: 1 },
  totalAmount: Number,
  utrNumber: String,
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled', 'disputed'],
    default: 'pending'
  },
  orderSources: mongoose.Schema.Types.Mixed,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
