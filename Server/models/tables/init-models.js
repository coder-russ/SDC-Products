/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize');
const _features = require('./features');
const _photos = require('./photos');
const _product = require('./product');
const _related = require('./related');
const _skus = require('./skus');
const _styles = require('./styles');

function initModels(sequelize) {
  const features = _features(sequelize, DataTypes);
  const photos = _photos(sequelize, DataTypes);
  const product = _product(sequelize, DataTypes);
  const related = _related(sequelize, DataTypes);
  const skus = _skus(sequelize, DataTypes);
  const styles = _styles(sequelize, DataTypes);

  features.belongsTo(product, { as: 'product', foreignKey: 'product_id' });
  product.hasMany(features, { as: 'features', foreignKey: 'product_id' });
  related.belongsTo(product, { as: 'product', foreignKey: 'product_id' });
  product.hasMany(related, { as: 'relateds', foreignKey: 'product_id' });
  styles.belongsTo(product, { as: 'product', foreignKey: 'product_id' });
  product.hasMany(styles, { as: 'styles', foreignKey: 'product_id' });
  photos.belongsTo(styles, { as: 'style', foreignKey: 'style_id' });
  styles.hasMany(photos, { as: 'photos', foreignKey: 'style_id' });
  skus.belongsTo(styles, { as: 'style', foreignKey: 'style_id' });
  styles.hasMany(skus, { as: 'skus', foreignKey: 'style_id' });

  return {
    features,
    photos,
    product,
    related,
    skus,
    styles,
  };
}
module.exports = { initModels };
