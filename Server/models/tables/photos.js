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
          key: 'id',
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'photos',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'photos_pkey',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
      ],
    });
    return photos;
  }
}

module.exports = (sequelize, DataTypes) => photos.init(sequelize, DataTypes);
