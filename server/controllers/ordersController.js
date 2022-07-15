const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Order } = require('../models/ordersModel');
const { Cart } = require('../models/cartModel');
const { User } = require('../models/usersModel');
const { FoodPlate } = require('../models/foodPlatesModel');
const { FoodPlateImg } = require('../models/foodPlateImgModel');
const { FoodQualification } = require('../models/foodQualificationModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

const getAllOrders = catchAsync(async (req, res) => {

    const orders = await Order.findAll({
        include: [{
                model: Cart,
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId', 'rolId']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { status: 'purchase' }
            }, {
                model: FoodPlate,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: FoodPlateImg,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }, {
                    model: FoodQualification,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }]
            }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    });

    const foodsPromises = orders.map(async food => {

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


    res.status(200).json({ message: 'Success', orders: foodsResolved });

});

const getOrdersByUser = catchAsync(async (req, res) => {

    const { sessionUser } = req;

    const orders = await Order.findAll({
        include: [{
                model: Cart,
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status', 'roleId', 'rolId']
                    }
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: { status: 'purchase' }
            }, {
                model: FoodPlate,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: FoodPlateImg,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }, {
                    model: FoodQualification,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }]
            }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { userId: sessionUser.id }
    });

    const foodsPromises = orders.map(async food => {

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


    res.status(200).json({ message: 'Success', orders: foodsResolved });

});

module.exports = { getAllOrders, getOrdersByUser };