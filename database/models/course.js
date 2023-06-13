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
      course.hasMany(models.chapters, {
        as: 'courseChapters',
        foreignKey: 'courseid',
        onDelete:"CASCADE",
      });
    }
  }
  course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      youwilllearn:DataTypes.ARRAY(DataTypes.STRING),
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
