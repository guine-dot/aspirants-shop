import express from 'express';
import auth from '../middleware/auth.js';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);

export default router;
