const { Cart } = require('./cartModel');
const { Category } = require('./categoriesModel');
const { CategoryImg } = require('./categoryImgModel');
const { FoodPlate } = require('./foodPlatesModel');
const { FoodInCart } = require('./foodsInCartModel');
const { FoodQualification } = require('./foodQualificationModel');
const { FoodPlateImg } = require('./foodPlateImgModel');
const { Order } = require('./ordersModel');
const { Rol } = require('./rolesModel');
const { User } = require('./usersModel');

const initModels = () => {
    
    Cart.hasMany(FoodInCart);
    FoodInCart.belongsTo(Cart);

    Cart.hasOne(Order);
    Order.belongsTo(Cart);

    User.hasOne(Cart);
    Cart.belongsTo(User);

    User.hasMany(FoodPlate);
    FoodPlate.belongsTo(User);

    User.hasMany(Order);
    Order.belongsTo(User);

    FoodPlate.hasMany(Order);
    Order.belongsTo(FoodPlate);

    User.hasMany(FoodQualification);
    FoodQualification.belongsTo(User);

    Rol.hasOne(User);
    User.belongsTo(Rol);

    FoodPlate.hasOne(FoodInCart);
    FoodInCart.belongsTo(FoodPlate);

    FoodPlate.hasMany(FoodQualification);
    FoodQualification.belongsTo(FoodPlate);

    FoodPlate.hasMany(FoodPlateImg);
    FoodPlateImg.belongsTo(FoodPlate);

    Category.hasOne(FoodPlate);
    FoodPlate.belongsTo(Category);

    Category.hasMany(CategoryImg);
    CategoryImg.belongsTo(Category);

};
  
module.exports = { initModels };