const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Cart } = require('../models/cartModel');
const { Order } = require('../models/ordersModel');
const { FoodInCart } = require('../models/foodsInCartModel');
const { FoodPlate } = require('../models/foodPlatesModel');
const { FoodPlateImg } = require('../models/foodPlateImgModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

const getFoodsInCart = catchAsync(async (req, res) => {

    const { sessionUser } = req;

    const foods = await FoodInCart.findAll({
        include: [
            {
                model: Cart,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { userId: sessionUser.id }
            },
            {
                model: FoodPlate,
                include: [{
                    model: FoodPlateImg,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    });

    const foodsPromises = foods.map(async food => {

        const foodsImgsPromises = food.foods_plate.foods_images.map(async foodImg => {

            const imgRef = ref(storage, foodImg.image_url);

            const url = await getDownloadURL(imgRef);

            foodImg.image_url = url;
                
            return foodImg;

        });

        const foodsImgsResolved = await Promise.all(foodsImgsPromises);

        food.foodsImgs = foodsImgsResolved;

        return food;

    });

    const foodsResolved = await Promise.all(foodsPromises);

    res.status(200).json({ message: 'Success', foods: foodsResolved });

});

const addFoodToCart = catchAsync(async (req, res) => {

    const { sessionUser, cart } = req;

    const { foodsPlateId, quantity } = req.body;

    await FoodInCart.create({ cartId: cart.id, foodsPlateId, quantity });

    res.status(201).json({ message: 'Success' });

});

const updateFoodInCart = catchAsync(async (req, res) => { 

    const { cart } = req;
  
    const { positionFood, foodsPlateId, newQuantity } = req.body;
  
    if(newQuantity === 0) {
        await FoodInCart.destroy({ where: { id: positionFood, cartId: cart.id, foodsPlateId }});
    }

    const foodReference = await FoodInCart.findOne({ where: { id: positionFood, cartId: cart.id, foodsPlateId } });
  
    await FoodInCart.update({ quantity: newQuantity + foodReference.quantity }, { where: { id: positionFood, cartId: cart.id, foodsPlateId } });
    
    res.status(201).json({ status: 'success' });
  
});

const resetAmountFoodInCart = catchAsync(async (req, res) => {

    const { cart } = req;

    const { id } = req.params;

    const foodReference = await FoodInCart.findOne({ where: { id, cartId: cart.id } });

    await FoodInCart.update({ quantity: foodReference.quantity - 1 }, { where: { id, cartId: cart.id } });

    res.status(201).json({ status: 'success' });

});

const removeFoodFromCart = catchAsync(async (req, res) => {

    const { id } = req.params;

    await FoodInCart.destroy({ where: { id } });

    res.status(201).json({ message: 'Success' });

});

const purchaseCart = catchAsync(async (req, res) => {

    const { sessionUser, cart, foods } = req;

    foods.map(async ({ foodsPlateId, quantity }) => {
        
        const food = await FoodPlate.findOne({ where: { id: foodsPlateId } });

        const newQuantity = food.quantity - quantity;

        await FoodPlate.update({ quantity: newQuantity }, { where: { id: foodsPlateId } });

        const totalPrice = food.price * quantity;

        await Order.create({ userId: sessionUser.id, cartId: cart.id, foodsPlateId: food.id, total_price: totalPrice });

        await FoodInCart.destroy({ where: { cartId: cart.id } });

        await Cart.update({ status: 'purchase' }, { where: { id: cart.id } });

    });

    res.status(201).json({ status: 'success' });

});

module.exports = { getFoodsInCart, addFoodToCart, updateFoodInCart, resetAmountFoodInCart, removeFoodFromCart, purchaseCart };