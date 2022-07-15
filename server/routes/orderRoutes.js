const express = require('express');

// Middlewares
const { protectToken } = require('../middlewares/usersMiddleware');

// Controller
const { getAllOrders, getOrdersByUser } = require('../controllers/ordersController');

const router = express.Router();

// Routes protected

router.use(protectToken);

router.get('/', getAllOrders);
router.get('/user', getOrdersByUser);

module.exports = { ordersRouter: router };