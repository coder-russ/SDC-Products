const sequelize = require('../db');
const { initModels } = require('./tables/init-models');

const models = initModels(sequelize);

module.exports = {
  // Get styles data with list of photos and skus
  getProductStyles: (productId) => models.styles.findAll({
    where: { product_id: productId },
    include: [
      {
        model: models.photos,
        as: 'photos',
        attributes: ['thumbnail_url', 'url'],
      },
      {
        model: models.skus,
        as: 'skus',
        attributes: { exclude: ['style_id'] },
      },
    ],
    attributes: { exclude: ['product_id'] },
  })
    .then((data) => ({ product_id: productId, results: data }))
    .catch((err) => err),
  // Get list of related products for specified product id
  getProductRelated: (productId) => models.related.findAll({
    where: { product_id: productId },
    attributes: ['related_product_id'],
    raw: true,
  })
    .then((related) => related.map((item) => item.related_product_id)),
  // Get list of products (default is 5)
  getProducts: (query) => {
    const count = query.count ? Number(query.count) : 5;
    const page = query.page ? Number(query.page) - 1 : 0;
    return models.product.findAll({
      limit: count,
      offset: page * count,
      raw: true,
    });
  },
  // Get data for specified product id including features
  getProductId: (productId) => models.product.findAll({
    where: { product_id: productId },
    include: { model: models.features, as: 'features', attributes: ['feature', 'value'] },
  }),
  // Route to test opitimizations
  // getTest: (productId) => models.styles.findAll({
  //   where: { product_id: productId },
  //   include: [
  //     {
  //       model: models.photos,
  //       as: 'photos',
  //       attributes: ['thumbnail_url', 'url'],
  //     },
  //     {
  //       model: models.skus,
  //       as: 'skus',
  //       attributes: { exclude: ['style_id'] },
  //     },
  //   ],
  //   attributes: { exclude: ['product_id'] },
  // })
  //   .then((data) => {
  //     debugger;
  //     const dataObject = { product_id: productId, results: data };
  //     return dataObject;
  //   })
  //   .catch((err) => err),
};
