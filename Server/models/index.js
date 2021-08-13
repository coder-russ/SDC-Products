const sequelize = require('../db');
const { initModels } = require('./tables/init-models');

const models = initModels(sequelize);

module.exports = {
  getProducts: (query) => {
    const page = query.page || 1;
    const count = query.count || 5;
    const total = Number(page) * Number(count);
    return models.product.findAll({ limit: total });
  },
  getProductId: (productId) => {
    const promise1 = models.product.findAll({
      where: {
        id: productId,
      },
    });
    const promise2 = models.features.findAll({
      attributes: ['feature', 'value'],
      where: {
        product_id: productId,
      },
    });
    return Promise.all([promise1, promise2]);
  },
  getProductStyles: () => 'placeholder',
  getProductRelated: () => 'placeholder',
};
