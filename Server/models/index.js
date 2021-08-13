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
    return Promise.all([promise1, promise2]);
  },
  getProductStyles: (productId) => {
    const dataObject = {
      product_id: productId.toString(),
      results: [],
    };
    return models.styles.findAll({
      where: { product_id: productId },
    })
      .then((data) => {
        const promiseArray = [];
        data.forEach((style) => {
          dataObject.results.push(style.dataValues);
          promiseArray.push(models.photos.findAll({
            attributes: ['thumbnail_url', 'url'],
            where: { style_id: style.dataValues.id },
          }));
        });
        return Promise.all(promiseArray);
      })
      .then((array) => {
        for (let i = 0; i < dataObject.results.length; i += 1) {
          array.forEach((promise) => {
            promise.forEach((photo) => {
              dataObject.results[i].photos = [];
              dataObject.results[i].photos = dataObject.results[i].photos.concat(photo.dataValues);
            });
          });
        }
        return dataObject;
      })
      .catch((err) => console.log(err));
  },
  getProductRelated: () => 'placeholder',
};
