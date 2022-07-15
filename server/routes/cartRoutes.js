const express = require('express');

// Middlewares
const { protectToken } = require('../middlewares/usersMiddleware');
const { createCart, validateUserCart, validateFoodsToPurchase } = require('../middlewares/cartMiddleware');

// Controller
const { getFoodsInCart, addFoodToCart, updateFoodInCart, resetAmountFoodInCart, removeFoodFromCart, purchaseCart } = require('../controllers/cartController');

const router = express.Router();

// Routes protected

router.use(protectToken);

router.get('/', getFoodsInCart);

router.post('/add_food', validateUserCart, createCart, addFoodToCart);

router.patch('/update_cart', validateUserCart, updateFoodInCart);

router.patch('/reset_amount/:id', validateUserCart, resetAmountFoodInCart);

router.delete('/:id', removeFoodFromCart);

router.post('/purchase', validateUserCart, validateFoodsToPurchase, purchaseCart);

module.exports = { cartRouter: router };