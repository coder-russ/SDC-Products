const Sequelize = require('sequelize');

class related extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'product_id',
        },
      },
      related_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'related',
      timestamps: false,
      indexes: [
        {
          name: 'related_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'productId_pkey',
          unique: false,
          fields: [
            { name: 'product_id' },
          ],
        },
      ],
    });
    return related;
  }
}

module.exports = (sequelize, DataTypes) => related.init(sequelize, DataTypes);
