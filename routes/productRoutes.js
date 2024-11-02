const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getProducts); // Público
router.post('/', authenticateToken, authorizeRole('admin'), addProduct); // Solo administrador

module.exports = router;
