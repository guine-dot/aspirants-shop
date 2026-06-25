import express from 'express';
import auth from '../middleware/auth.js';
import adminCheck from '../middleware/adminCheck.js';
import SiteConfig from '../models/SiteConfig.js';
import Game from '../models/Game.js';
import Package from '../models/Package.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Banner from '../models/Banner.js';
import FAQ from '../models/FAQ.js';
import Admin from '../models/Admin.js';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// ==================== SITE CONFIGURATION ====================
router.get('/config', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig();
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/config', auth, adminCheck, async (req, res) => {
  try {
    const config = await SiteConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ message: 'Configuration updated', config });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== GAMES MANAGEMENT ====================
router.post('/games', auth, adminCheck, async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ message: 'Game created', game });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/games/:id', auth, adminCheck, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Game updated', game });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/games/:id', auth, adminCheck, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== PACKAGES MANAGEMENT ====================
router.post('/packages', auth, adminCheck, async (req, res) => {
  try {
    const package_ = new Package(req.body);
    await package_.save();
    const game = await Game.findByIdAndUpdate(req.body.game, { $push: { packages: package_._id } });
    res.status(201).json({ message: 'Package created', package: package_ });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/packages/:id', auth, adminCheck, async (req, res) => {
  try {
    const package_ = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Package updated', package: package_ });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/packages/:id', auth, adminCheck, async (req, res) => {
  try {
    const package_ = await Package.findByIdAndDelete(req.params.id);
    await Game.findByIdAndUpdate(package_.game, { $pull: { packages: package_._id } });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== BANNERS MANAGEMENT ====================
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/banners', auth, adminCheck, async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json({ message: 'Banner created', banner });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/banners/:id', auth, adminCheck, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Banner updated', banner });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/banners/:id', auth, adminCheck, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== FAQs MANAGEMENT ====================
router.get('/faq', async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/faq', auth, adminCheck, async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json({ message: 'FAQ created', faq });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/faq/:id', auth, adminCheck, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'FAQ updated', faq });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/faq/:id', auth, adminCheck, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== USERS MANAGEMENT ====================
router.get('/users', auth, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password').limit(100);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/users/:id', auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== ORDERS MANAGEMENT ====================
router.get('/orders', auth, adminCheck, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email phone')
      .populate('game', 'name')
      .populate('package', 'name price')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/orders/:id', auth, adminCheck, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== ANALYTICS ====================
router.get('/analytics/overview', auth, adminCheck, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/analytics/revenue', auth, adminCheck, async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);

    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/analytics/games', auth, adminCheck, async (req, res) => {
  try {
    const gameStats = await Order.aggregate([
      {
        $group: {
          _id: '$game',
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $lookup: { from: 'games', localField: '_id', foreignField: '_id', as: 'gameInfo' } },
      { $unwind: '$gameInfo' },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json(gameStats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== STAFF MANAGEMENT ====================
router.get('/staff', auth, adminCheck, async (req, res) => {
  try {
    const staff = await Admin.find().populate('user', 'username email');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/staff', auth, adminCheck, async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ message: 'Staff member added', admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/staff/:id', auth, adminCheck, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Staff updated', admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
