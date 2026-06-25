import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  name: String,
  description: String,
  quantity: Number,
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number,
  discount: {
    type: Number,
    default: 0
  },
  tier: {
    type: String,
    enum: ['standard', 'premium', 'vip'],
    default: 'standard'
  },
  badge: String,
  image: String,
  isActive: {
    type: Boolean,
    default: true
  },
  stock: Number,
  popularity: {
    type: Number,
    default: 0
  },
  minPurchase: {
    type: Number,
    default: 1
  },
  maxPurchase: {
    type: Number,
    default: null
  },
  availableFrom: Date,
  availableUntil: Date,
  customAttributes: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Package', packageSchema);
