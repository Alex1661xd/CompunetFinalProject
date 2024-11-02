const express = require('express');
const { createOrder, getOrderHistory } = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createOrder); // Solo cliente
router.get('/:username', authenticateToken, getOrderHistory); // Solo cliente

module.exports = router;
