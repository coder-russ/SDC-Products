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
          key: 'style_id',
        },
      },
      size: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // skuObject: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     return {
      //       [this.id]: {
      //         quantity: this.quantity,
      //         size: this.size,
      //       },
      //     };
      //   },
      // },
    }, {
      sequelize,
      tableName: 'skus',
      timestamps: false,
      indexes: [
        {
          name: 'skus_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'style_id_pkey',
          unique: false,
          fields: [
            { name: 'style_id' },
          ],
        },
      ],
    });
    return skus;
  }
}

module.exports = (sequelize, DataTypes) => skus.init(sequelize, DataTypes);
