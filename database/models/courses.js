'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    static associate(models) {
      courses.hasMany(models.tasks, {
        as: 'courseTask',
        foreignKey: 'courseid',
        onDelete: 'CASCADE',
      });
      courses.hasMany(models.chapters, {
        as: 'courseChapters',
        foreignKey: 'courseid',
        onDelete: "CASCADE",
      });

    }
  }
  courses.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      youwilllearn:DataTypes.ARRAY(DataTypes.STRING),
      image:DataTypes.STRING(99999),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'courses',
    }
  );
  return courses;
};
