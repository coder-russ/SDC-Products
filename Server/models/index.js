const sequelize = require('../db');
const { initModels } = require('./tables/init-models');

const models = initModels(sequelize);

module.exports = {
  // Get list of products (default is 5)
  getProducts: (query) => {
    const count = query.count ? Number(query.count) : 5;
    const page = query.page ? Number(query.page) - 1 : 0;
    return models.product.findAll({
      limit: count,
      offset: page * count,
    });
  },
  // Get data for specified product id including features
  getProductId: (productId) => models.product.findAll({
    where: { product_id: productId },
    include: { model: models.features, as: 'features', attributes: ['feature', 'value'] },
  }),
  // Get styles data with list of photos and skus
  getProductStyles: (productId) => {
    const dataObject = {
      product_id: productId,
      results: [],
    };
    return models.styles.findAll({
      where: { product_id: productId },
      include: [
        { model: models.photos, as: 'photos', attributes: ['thumbnail_url', 'url'] },
        { model: models.skus, as: 'skus' },
      ],
    })
      .then((data) => {
        data.forEach((style, index) => {
          dataObject.results.push(style.dataValues);
          const skuObject = {};
          style.dataValues.skus.forEach((sku) => {
            skuObject[sku.id] = { quantity: sku.quantity, size: sku.size };
          });
          dataObject.results[index].skus = skuObject;
        });
        return dataObject;
      })
      .catch((err) => err);
  },
  // Get list of related products for specified product id
  getProductRelated: (productId) => models.related.findAll({
    where: { product_id: productId },
  })
    .then((data) => {
      const related = [];
      data.forEach((item) => {
        related.push(item.dataValues.related_product_id);
      });
      return related;
    })
    .catch((err) => err),
  // Route to test opitimizations
  getTest: (productId) => models.product.findAll({
    where: { product_id: productId },
    include: { model: models.features, as: 'features', attributes: ['feature', 'value'] },
  }),
};
