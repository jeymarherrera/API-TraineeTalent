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
        foreignKey: "courseid",
        onDelete: "CASCADE",
      });
    }
  }
  task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return task;
};