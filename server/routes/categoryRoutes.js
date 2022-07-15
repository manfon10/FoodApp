const express = require('express');

// Middlewares
const { protectToken } = require('../middlewares/usersMiddleware');

// Controller
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoriesController');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();

// Routes free

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Routes protected

router.use(protectToken);

router.post('/', upload.array('image'), createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = { categoriesRouter: router };