'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    static associate(models) {
      // Definir las asociaciones con otros modelos aquí si es necesario
    }
  }
  courses.init(
    {
      title: DataTypes.STRING,
      youwilllearn: DataTypes.ARRAY(DataTypes.STRING),
      precio: DataTypes.FLOAT,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      image: DataTypes.STRING(999999),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'courses'
    }
  );
  return courses;
};
