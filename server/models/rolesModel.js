const { DataTypes } = require('sequelize');
const { db } = require('../database/database');

const Rol = db.define('roles', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Rol };