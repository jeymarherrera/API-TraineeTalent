'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    static associate(models) {
   
      task.hasMany(models.question,{
        as: "taskQuestion",
        foreignKey: "taskid",
        onDelete: "CASCADE",
      });

      task.belongsTo(models.course, {
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
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};