const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/mydb');

module.exports = sequelize;
