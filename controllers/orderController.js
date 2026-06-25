import Order from '../models/Order.js';
import Game from '../models/Game.js';
import Package from '../models/Package.js';
import User from '../models/User.js';

const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const createOrder = async (req, res) => {
  try {
    const { gameId, packageId, quantity, orderSources, utrNumber } = req.body;

    if (!gameId || !packageId || !quantity || !utrNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const game = await Game.findById(gameId);
    const package_ = await Package.findById(packageId);

    if (!game || !package_) {
      return res.status(404).json({ message: 'Game or package not found' });
    }

    // Validate quantity
    if (quantity < package_.minPurchase || (package_.maxPurchase && quantity > package_.maxPurchase)) {
      return res.status(400).json({ message: `Quantity must be between ${package_.minPurchase} and ${package_.maxPurchase}` });
    }

    const totalAmount = package_.price * quantity;

    const order = new Order({
      orderNumber: generateOrderNumber(),
      user: req.userId,
      game: gameId,
      package: packageId,
      quantity,
      orderSources,
      totalAmount,
      utrNumber,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    await order.save();

    // Update user stats
    const user = await User.findById(req.userId);
    user.totalSpent += totalAmount;
    await user.save();

    // Send to WhatsApp
    const whatsappMessage = `*Order Confirmation - ASPIRANTS.SHOP*\n\nOrder ID: ${order.orderNumber}\nGame: ${game.name}\nQuantity: ${quantity}\nTotal: ₹${totalAmount}\nUTR: ${utrNumber}\n\nThank you for your purchase!`;
    // Integration would go here

    res.status(201).json({
      message: 'Order created successfully',
      order,
      whatsappLink: `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('game', 'name icon')
      .populate('package', 'name price quantity')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('game')
      .populate('package')
      .populate('user', 'username email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization
    if (order.user._id.toString() !== req.userId && req.user?.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled', 'disputed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        updatedAt: new Date()
      },
      { new: true }
    );

    // Add to timeline
    if (order) {
      order.timeline.push({
        status,
        timestamp: new Date()
      });
      await order.save();
    }

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
