import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: String,
  image: String,
  mobileImage: String,
  desktopImage: String,
  link: String,
  ctaText: String,
  description: String,
  position: {
    type: String,
    enum: ['homepage', 'category_pages', 'game_pages', 'checkout'],
    default: 'homepage'
  },
  targetAudience: {
    userTiers: [String],
    locations: [String],
    behaviors: [String]
  },
  animation: {
    type: String,
    enum: ['fade', 'slide', 'zoom', 'none'],
    default: 'fade'
  },
  priority: {
    type: Number,
    default: 0
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  startDate: Date,
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  rotationFrequency: Number,
  impressions: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Banner', bannerSchema);
