const express = require('express');

// Middlewares
const { protectToken } = require('../middlewares/usersMiddleware');
const { foodCalificationExists, protectQualificationUser } = require('../middlewares/foodsMiddleware');

// Controller
const { 
    createFoodPlate, 
    getAllFoods, 
    rateFoodPlate,
    deleteRateFood, 
    getFoodById, 
    getFoodByCategory, 
    getAllRateById, 
    filterFood 
} = require('../controllers/foodsController');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();

// Routes free

router.get('/filter', filterFood);
router.get('/', getAllFoods);
router.get('/:id/get_rate', getAllRateById);
router.get('/:id', getFoodById);
router.get('/category/:id', getFoodByCategory);

// Routes protected

router.use(protectToken);

router.post('/', upload.array('image'), createFoodPlate);
router.post('/:id/food_rate', foodCalificationExists, rateFoodPlate);
router.delete('/:id/delete_rate', protectQualificationUser, deleteRateFood);

module.exports = { foodRouter: router };