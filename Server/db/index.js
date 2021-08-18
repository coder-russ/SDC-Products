const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'postgres', 'russ', {
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000,
    maxUses: 7500,
  },
  host: '18.189.44.192',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
