const Sequelize = require('sequelize');

class photos extends Sequelize.Model {
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
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnail_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'photos',
      timestamps: false,
      indexes: [
        {
          name: 'photos_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'styleId_pkey',
          unique: false,
          fields: [
            { name: 'style_id' },
          ],
        },
      ],
    });
    return photos;
  }
}

module.exports = (sequelize, DataTypes) => photos.init(sequelize, DataTypes);
