import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: String,
  phoneVerificationCode: String,
  verificationCodeExpiry: Date,
  profilePicture: {
    type: String,
    default: null
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'sakura', 'neon', 'emerald', 'midnight', 'ocean', 'golden', 'gradient'],
    default: 'light'
  },
  userTier: {
    type: String,
    enum: ['regular', 'vip', 'premium'],
    default: 'regular'
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  loyaltyPoints: {
    type: Number,
    default: 0
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  settings: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: true }
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockReason: String,
  lastLogin: Date,
  loginHistory: [{
    timestamp: Date,
    ipAddress: String,
    device: String
  }],
  passwordResetToken: String,
  passwordResetExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
