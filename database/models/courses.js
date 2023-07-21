'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    static associate(models) {
      courses.hasMany(models.purchases, {
        as: "coursesPurchases",
        foreignKey: "courseId",
        onDelete: "CASCADE",
      });
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
      recomended: DataTypes.BOOLEAN,
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
