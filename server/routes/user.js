const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, phone, updatedAt: new Date() },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});

// Update theme
router.put('/theme', auth, async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme) {
      return res.status(400).json({ message: 'Theme is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { theme },
      { new: true }
    );

    res.json({
      message: 'Theme updated successfully',
      user: user.toJSON()
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update theme', error: err.message });
  }
});

module.exports = router;
