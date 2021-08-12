const Sequelize = require('sequelize');

class related extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      related_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'related',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'related_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
      ],
    });
    return related;
  }
}

module.exports = (sequelize, DataTypes) => related.init(sequelize, DataTypes);