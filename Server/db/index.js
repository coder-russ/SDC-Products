const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/mydb', {
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
  logging: false,
});

module.exports = sequelize;
