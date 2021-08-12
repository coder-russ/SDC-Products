const Sequelize = require('sequelize');

class skus extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      style_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'skus',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'skus_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
      ],
    });
    return skus;
  }
}

module.exports = (sequelize, DataTypes) => skus.init(sequelize, DataTypes);
