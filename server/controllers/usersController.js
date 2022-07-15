const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const process = require('dotenv').config();

// Models
const { User } = require('../models/usersModel');
const { Rol } = require('../models/rolesModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createUser = catchAsync(async (req, res) => {

    const { names, email, password, address } = req.body;
  
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({
        names,
        email,
        password: hashPassword,
        address
    });
  
    newUser.password = undefined;
  
    res.status(201).json({ message: 'Success', newUser });
  
});

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({
        where: { email, status: 'active' },
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }
  
    const token = await jwt.sign({ id: user.id }, process.parsed.JWT_SECRET, {
        expiresIn: process.parsed.JWT_EXPIRES_IN,
    });
  
    user.password = undefined;
  
    res.status(200).json({ token, user });

});

const createRol = catchAsync(async (req, res) => {

    const { name } = req.body;

    await Rol.create({ name });

    res.status(201).json({ message: 'Success' });

});

const updateUser = catchAsync(async (req, res) => {

    const { user, sessionUser } = req;

    const { names, email, address } = req.body;

    await user.update({ names, email, address }, { where: { id: sessionUser.id } });

    res.status(201).json({ message: 'Success' });

});

module.exports = { createUser, login, createRol, updateUser };