'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    static associate(models) {
   
      question.hasMany(models.options_answers,{
        as: "questionOptions_answers",
        foreignKey: "questionid",
        onDelete: "CASCADE",
      });

      question.belongsTo(models.tasks, {
        as: "questionTask",
        foreignKey: "taskid",
        onDelete: "CASCADE",
      });
    }
  }
  question.init({
    question: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};