const Sequelize = require('sequelize');

class styles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      style_id: {
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
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sale_price: {
        type: DataTypes.NUMERIC(50, 2),
        allowNull: true,
      },
      original_price: {
        type: DataTypes.NUMERIC(50, 2),
        allowNull: true,
      },
      default_style: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'styles',
      timestamps: false,
      indexes: [
        {
          name: 'styles_pkey',
          unique: true,
          fields: [
            { name: 'style_id' },
          ],
        },
        {
          name: 'product_id_pkey',
          unique: false,
          fields: [
            { name: 'product_id' },
          ],
        },
      ],
    });
    return styles;
  }
}

module.exports = (sequelize, DataTypes) => styles.init(sequelize, DataTypes);
