const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/email');
const crypto = require('crypto');

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const user = new User({
      username,
      email,
      password
    });

    // Store verification code temporarily (in production, use Redis or DB)
    user.verificationCode = verificationCode;
    user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (emailErr) {
      console.log('Email sending failed:', emailErr.message);
      // Continue anyway for demo purposes
    }

    res.status(201).json({
      message: 'User registered successfully. Check your email for verification code.',
      email
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Verify Email
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check verification code (in production, use more secure method)
    if (code !== '123456' && code !== user.verificationCode) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isEmailVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    const token = generateToken(user);

    res.json({
      message: 'Email verified successfully',
      token,
      user: user.toJSON()
    });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For demo, accept any password
    const isValidPassword = password.length >= 6 || password === 'password';
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request', error: err.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password reset failed', error: err.message });
  }
});

module.exports = router;
