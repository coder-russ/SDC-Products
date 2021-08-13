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
      where: { id: productId },
    });
    const promise2 = models.features.findAll({
      attributes: ['feature', 'value'],
      where: { product_id: productId },
    });
    return Promise.all([promise1, promise2])
      .then((array) => {
        const result = {
          id: array[0][0].dataValues.id,
          name: array[0][0].dataValues.name,
          slogan: array[0][0].dataValues.slogan,
          description: array[0][0].dataValues.description,
          category: array[0][0].dataValues.category,
          default_price: array[0][0].dataValues.default_price,
          features: array[1],
        };
        return result;
      })
      .catch((err) => err);
  },
  getProductStyles: (productId) => {
    const dataObject = {
      product_id: productId.toString(),
      results: [],
    };
    const skuArray = [];
    return models.styles.findAll({
      where: { product_id: productId },
    })
      .then((data) => {
        const photoArray = [];
        data.forEach((style) => {
          dataObject.results.push(style.dataValues);
          skuArray.push(models.skus.findAll({
            attributes: ['id', 'quantity', 'size'],
            where: { style_id: style.dataValues.style_id },
          }));
          photoArray.push(models.photos.findAll({
            attributes: ['thumbnail_url', 'url'],
            where: { style_id: style.dataValues.style_id },
          }));
        });
        return Promise.all(photoArray);
      })
      .then((array) => {
        for (let i = 0; i < dataObject.results.length; i += 1) {
          dataObject.results[i].photos = [];
          array.forEach((promise) => {
            promise.forEach((photo) => {
              dataObject.results[i].photos = dataObject.results[i].photos.concat(photo.dataValues);
            });
          });
        }
        return Promise.all(skuArray);
      })
      .then((array) => {
        for (let i = 0; i < dataObject.results.length; i += 1) {
          array.forEach((promise) => {
            promise.forEach((sku) => {
              const skuObject = {
                [sku.dataValues.id]: {
                  quantity: sku.dataValues.quantity,
                  size: sku.dataValues.size,
                },
              };
              const existingSkus = dataObject.results[i].skus;
              dataObject.results[i].skus = { ...existingSkus, ...skuObject };
            });
          });
        }
        return dataObject;
      })
      .catch((err) => err);
  },
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
};
