//Models
const { Cart } = require('../models/cartModel');
const { FoodInCart } = require('../models/foodsInCartModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createCart = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;

    const cartExist = await Cart.findOne({ where: { userId: sessionUser.id, status: 'active' } });

    if(!cartExist) {

        const cart = await Cart.create({ userId: sessionUser.id });

        req.cart = cart;

        return next();

    }

    next();

});

const validateUserCart = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;

    const cart = await Cart.findOne({ where: { userId: sessionUser.id, status: 'active' } });

    if(!cart) {

        req.cart = cart;

        return next();
    }

    const foodsInCart = await FoodInCart.findAll({ where: { cartId: cart.id } });

        if(cart && foodsInCart) {

            req.cart = cart;

            return next();

        }

    next();

});

const validateFoodsToPurchase = catchAsync(async (req, res, next) => {

    const { cart } = req;

        const foods = await FoodInCart.findAll({ where: { cartId: cart.id } });

        if(Object.keys(foods).length === 0) {
            return next(new AppError('It does not have products in the cart', 404));
        }

        req.foods = foods;

    next();

});

module.exports = { createCart, validateUserCart, validateFoodsToPurchase };