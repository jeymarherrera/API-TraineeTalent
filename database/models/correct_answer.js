'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class correct_answer extends Model {
    static associate(models) { 

      correct_answer.belongsTo(models.options_answers, {
        as: "correct_answerOptions_answers",
        foreignKey: "optionid",
        onDelete: "CASCADE",
      });
    }
  }
  correct_answer.init({
    feedback: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'correct_answer',
  });
  return correct_answer;
};