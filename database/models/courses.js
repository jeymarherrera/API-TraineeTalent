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
    }
  }
  courses.init(
    {
      
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
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
