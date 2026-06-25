const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const User = require('../models/User');
const Order = require('../models/Order');
const Game = require('../models/Game');
const Package = require('../models/Package');
const Analytics = require('../models/Analytics');
const SiteConfig = require('../models/SiteConfig');

// Get site config
router.get('/config', async (req, res) => {
  try {
    const config = await SiteConfig.findOne() || {
      siteName: 'ASPIRANTS.SHOP',
      phoneNumber: '+91 9862277104',
      email: 'support@aspirants.shop'
    };
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch config', error: err.message });
  }
});

// Update site config
router.put('/config', auth, adminCheck, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.json({ message: 'Config updated successfully', config });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update config', error: err.message });
  }
});

// Get analytics
router.get('/analytics/overview', auth, adminCheck, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders: await Order.find().sort({ createdAt: -1 }).limit(10).populate('user game')
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
  }
});

// Get all users
router.get('/users', auth, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Create game
router.post('/games', auth, adminCheck, async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ message: 'Game created successfully', game });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create game', error: err.message });
  }
});

// Update game
router.put('/games/:id', auth, adminCheck, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Game updated successfully', game });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update game', error: err.message });
  }
});

// Delete game
router.delete('/games/:id', auth, adminCheck, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete game', error: err.message });
  }
});

// Create package
router.post('/packages', auth, adminCheck, async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    
    // Add package to game
    if (req.body.game) {
      await Game.findByIdAndUpdate(req.body.game, {
        $push: { packages: pkg._id }
      });
    }
    
    res.status(201).json({ message: 'Package created successfully', package: pkg });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create package', error: err.message });
  }
});

// Update order status
router.put('/orders/:id', auth, adminCheck, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    ).populate('game user package');
    
    res.json({ message: 'Order status updated successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
});

module.exports = router;
