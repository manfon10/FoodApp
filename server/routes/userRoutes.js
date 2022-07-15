const express = require('express');

// Middlewares
const { protectToken, userExists } = require('../middlewares/usersMiddleware');

// Controller
const { createUser, login, createRol, updateUser } = require('../controllers/usersController');

const router = express.Router();

// Routes free
router.post('/signup', createUser);
router.post('/login', login);
router.post('/create_rol', createRol)

// Routes protected

router.use(protectToken);

router.patch('/update_user/:id', userExists, updateUser);

module.exports = { usersRouter: router };