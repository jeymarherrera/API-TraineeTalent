'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    static associate(models) {
      course.hasMany(models.tasks, {
        as: 'courseTask',
        foreignKey: 'courseid',
        onDelete: 'CASCADE',
      });
    }
  }
  course.init(
    {
      title: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'courses',
    }
  );
  return course;
};
