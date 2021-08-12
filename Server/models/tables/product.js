const Sequelize = require('sequelize');

class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slogan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      default_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'product',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'product_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
      ],
    });
    return product;
  }
}

module.exports = (sequelize, DataTypes) => product.init(sequelize, DataTypes);
