'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      cart.belongsTo(models.professionals, {
        foreignKey: 'professionalId',
        onDelete: 'CASCADE',
      });

      cart.belongsTo(models.companies, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
      });

      cart.belongsTo(models.courses, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE',
      });
    }
  }

  cart.init(
    {
      professionalId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'cart',
    }
  );

  return cart;
};
