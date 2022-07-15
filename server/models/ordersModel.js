const { DataTypes } = require('sequelize');
const { db } = require('../database/database');

const Order = db.define('orders', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    foodsPlateId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = { Order };
