const { DataTypes } = require('sequelize');
const { db } = require('../database/database');

const FoodQualification = db.define('foods_qualification', {
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
    qualification: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = { FoodQualification };