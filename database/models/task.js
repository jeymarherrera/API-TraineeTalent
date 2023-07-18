'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
   
      task.hasMany(models.questions,{
        as: "taskQuestion",
        foreignKey: "taskid",
        onDelete: "CASCADE",
      });

      task.belongsTo(models.courses, {
        as: "taskCourse",
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING(999999),
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return task;
};