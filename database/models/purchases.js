'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    static associate(models) {
      Purchases.belongsTo(models.professionals, {
        foreignKey: 'professionalId',
        onDelete: 'CASCADE',
      });

      Purchases.belongsTo(models.companies, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
      });

      Purchases.belongsTo(models.courses, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }

  Purchases.init(
    {
      professionalId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      date: DataTypes.DATE,
      paymentId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'purchases',
    }
  );

  return Purchases;
};