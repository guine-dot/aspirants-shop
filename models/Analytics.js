import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: Date,
  type: {
    type: String,
    enum: ['visitor', 'revenue', 'order', 'user', 'payment'],
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  value: Number,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Analytics', analyticsSchema);
