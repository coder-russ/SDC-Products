const Sequelize = require('sequelize');

class styles extends Sequelize.Model {
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
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sale_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      original_price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      default_style: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'styles',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'styles_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
      ],
    });
    return styles;
  }
}

module.exports = (sequelize, DataTypes) => styles.init(sequelize, DataTypes);
