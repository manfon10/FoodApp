
//Models
const { FoodQualification } = require('../models/foodQualificationModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const foodCalificationExists = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const { sessionUser } = req;
  
    const qualification = await FoodQualification.findOne({ where: { foodsPlateId: id, userId: sessionUser.id } });
  
    if (qualification) {
        return next(new AppError('You have already rated this plate', 404));
    }
  
    next();
  
});

const protectQualificationUser = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const { sessionUser } = req;

    const qualificationUser = await FoodQualification.findOne({ where: { foodsPlateId: id, userId: sessionUser.id } });

    if(qualificationUser.userId !== sessionUser.id) {
        return next(new AppError('This rating cannot be deleted', 404));
    }

    next();

});

module.exports = { foodCalificationExists, protectQualificationUser };