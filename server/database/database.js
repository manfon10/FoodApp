const { Sequelize } = require('sequelize');
const process = require('dotenv').config();

// Create a connection to database
const db = new Sequelize({
    dialect: 'mysql',
    host: process.parsed.DB_HOST,
    username: process.parsed.DB_USER,
    password: process.parsed.DB_PASS,
    database: process.parsed.DB,
    logging: false,
});

module.exports = { db };