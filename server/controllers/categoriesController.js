const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Category } = require('../models/categoriesModel');
const { CategoryImg } = require('../models/categoryImgModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

const createCategory = catchAsync(async (req, res) => {

    const { name } = req.body;

    const newCategory = await Category.create({ name });

    const categoryImgPromise = req.files.map(async file => {

        const imgRef = ref(storage, `categories/${newCategory.id}-${Date.now()}-${file.originalname}`);
      
        const imgUploaded = await uploadBytes(imgRef, file.buffer);

        return await CategoryImg.create({
            categoryId: newCategory.id,
            image_url: imgUploaded.metadata.fullPath,
        });
      
    });
      
    await Promise.all(categoryImgPromise);

    res.status(201).json({ message: 'Success' })

});

const getAllCategories = catchAsync(async (req, res) => {

    const categories = await Category.findAll({
        include: [{
            model: CategoryImg,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    const categoriesPromises = categories.map(async category => {

        const categoriesImgsPromises = category.categories_images.map(async categoryImg => {

            const imgRef = ref(storage, categoryImg.image_url);

            const url = await getDownloadURL(imgRef);

            categoryImg.image_url = url;
                
            return categoryImg;

        });

        const categoriesImgsResolved = await Promise.all(categoriesImgsPromises);

        category.foodsImgs = categoriesImgsResolved;

        return category;

    });

    const categoriesResolved = await Promise.all(categoriesPromises);

    res.status(200).json({ message: 'Success', categories: categoriesResolved});

});

const getCategoryById = catchAsync(async (req, res) => {

    const { id } = req.params;

    const categories = await Category.findAll({
        include: [{
            model: CategoryImg,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { id }
    });

    const categoriesPromises = categories.map(async category => {

        const categoriesImgsPromises = category.categories_images.map(async categoryImg => {

            const imgRef = ref(storage, categoryImg.image_url);

            const url = await getDownloadURL(imgRef);

            categoryImg.image_url = url;
                
            return categoryImg;

        });

        const categoriesImgsResolved = await Promise.all(categoriesImgsPromises);

        category.foodsImgs = categoriesImgsResolved;

        return category;

    });

    const categoriesResolved = await Promise.all(categoriesPromises);

    res.status(200).json({ message: 'Success', categories: categoriesResolved });

});

const updateCategory = catchAsync(async (req, res) => {

    const { id } = req.params;

    const { name } = req.body;

    await Category.update({ name }, { where: { id } });

    res.status(201).json({ message: 'Success' })

});

const deleteCategory = catchAsync(async (req, res) => {

    const { id } = req.params;

    await Category.destroy({ where: { id } });

    res.status(201).json({ message: 'Success' });

});

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };