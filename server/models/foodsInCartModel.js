const { DataTypes } = require('sequelize');
const { db } = require('../database/database');

const FoodInCart = db.define('foods_plates_in_cart', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = { FoodInCart };