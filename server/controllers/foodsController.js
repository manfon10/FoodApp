const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Models
const { FoodPlate } = require('../models/foodPlatesModel');
const { FoodPlateImg } = require('../models/foodPlateImgModel');
const { FoodQualification } = require('../models/foodQualificationModel');
const { Category } = require('../models/categoriesModel');
const { User } = require('../models/usersModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

const createFoodPlate = catchAsync(async (req, res) => {

    const { sessionUser } = req;

    const { categoryId, title, description, quantity, price } = req.body;

    const newFood = await FoodPlate.create({ categoryId, userId: sessionUser.id, title, description, quantity, price });

    const foodImgsPromises = req.files.map(async file => {

        const imgRef = ref(storage, `foods/${newFood.id}-${Date.now()}-${file.originalname}`);
      
        const imgUploaded = await uploadBytes(imgRef, file.buffer);

        return await FoodPlateImg.create({
            foodsPlateId: newFood.id,
            image_url: imgUploaded.metadata.fullPath,
        });
      
    });
      
    await Promise.all(foodImgsPromises);

    res.status(201).json({ message: 'Success' });

});

const getAllFoods = catchAsync(async (req, res) => {

    const foods = await FoodPlate.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: FoodPlateImg,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Category,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: FoodQualification,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    });

    const foodsPromises = foods.map(async food => {

        const foodsImgsPromises = food.foods_images.map(async foodImg => {

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

const rateFoodPlate = catchAsync(async (req, res) => {

    const { sessionUser } = req;

    const { id } = req.params;

    const { qualification } = req.body;

    await FoodQualification.create({ userId: sessionUser.id, qualification, foodsPlateId: id });

    res.status(201).json({ message: 'Success' });

});

const deleteRateFood = catchAsync(async (req, res, next) => {

    const { sessionUser, qualification } = req;

    const { id } = req.params;

    await FoodQualification.destroy({ where: { foodsPlateId: id, userId: sessionUser.id } });

    res.status(201).json({ message: 'Success' });

});

const getFoodById = catchAsync(async (req, res) => {

    const { id } = req.params;

    const foods = await FoodPlate.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: FoodPlateImg,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Category,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: FoodQualification,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ],
        where: { id } 
    });

    const foodsPromises = foods.map(async food => {

        const foodsImgsPromises = food.foods_images.map(async foodImg => {

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

    res.status(200).json({ message: 'Success', food: foodsResolved });

});

const getFoodByCategory = catchAsync(async (req, res) => {

    const { id } = req.params;

    const foods = await FoodPlate.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: FoodPlateImg,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Category,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: FoodQualification,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ],
        where: { categoryId: id } 
    });
    
    const foodsPromises = foods.map(async food => {

        const foodsImgsPromises = food.foods_images.map(async foodImg => {

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

const getAllRateById = catchAsync(async (req, res) => {

    const { id } = req.params;

    const rates = await FoodQualification.findAll({
        include: [{
            model: FoodPlate,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }],
        where: { foodsPlateId: id }
    });

    res.status(200).json({ message: 'Success', rates });

});

const filterFood = catchAsync(async (req, res) => {

    const { phrase } = req.query;

    const foods = await FoodPlate.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: FoodPlateImg,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Category,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        where: {
            title: {
                [Op.like]: `%${phrase}%`
            }
        }
    });

    const foodsPromises = foods.map(async food => {

        const foodsImgsPromises = food.foods_images.map(async foodImg => {

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

module.exports = { 
    createFoodPlate, 
    getAllFoods, 
    rateFoodPlate, 
    deleteRateFood, 
    getFoodById, 
    getFoodByCategory, 
    getAllRateById,
    filterFood
};