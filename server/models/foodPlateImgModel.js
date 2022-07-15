const { DataTypes } = require('sequelize');
const { db } = require('../database/database');

const FoodPlateImg = db.define('foods_images', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = { FoodPlateImg };