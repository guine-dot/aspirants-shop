import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email, phone, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    const validThemes = ['light', 'dark', 'sakura', 'neon', 'emerald', 'midnight', 'ocean', 'golden', 'gradient'];

    if (!validThemes.includes(theme)) {
      return res.status(400).json({ message: 'Invalid theme' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { theme, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json({ message: 'Theme updated successfully', theme: user.theme });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('settings theme');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { settings, updatedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Settings updated successfully', settings: user.settings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getLoginHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('loginHistory');
    res.json(user.loginHistory || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
