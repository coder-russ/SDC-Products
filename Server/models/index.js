const sequelize = require('../db');
const { initModels } = require('./tables/init-models');

const models = initModels(sequelize);

module.exports = {
  getProducts: () => models.product.findAll({ limit: 10 }),
  getProductId: () => 'placeholder',
  getProductStyles: () => 'placeholder',
  getProductRelated: () => 'placeholder',
};
