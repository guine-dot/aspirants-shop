const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const Game = require('../models/Game');
const Package = require('../models/Package');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { gameId, packageId, quantity, orderSources, utrNumber } = req.body;

    if (!gameId || !packageId || !utrNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const game = await Game.findById(gameId);
    const pkg = await Package.findById(packageId);

    if (!game || !pkg) {
      return res.status(404).json({ message: 'Game or package not found' });
    }

    const totalAmount = pkg.price * (quantity || 1);

    const order = new Order({
      user: req.user.id,
      game: gameId,
      package: packageId,
      quantity: quantity || 1,
      totalAmount,
      utrNumber,
      orderSources,
      orderStatus: 'pending'
    });

    await order.save();
    await order.populate('game package user');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('game package')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('game package user');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization
    if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order', error: err.message });
  }
});

module.exports = router;
