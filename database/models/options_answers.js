'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class options_answers extends Model {
    static associate(models) {
   
      options_answers.hasOne(models.correct_answer,{
        as: "options_answersCorrect_answer",
        foreignKey: "optionid",
        onDelete: "CASCADE",
      });

      options_answers.belongsTo(models.question, {
        as: "options_answersQuestion",
        foreignKey: "questionid",
        onDelete: "CASCADE",
      });
    }
  }
  options_answers.init({
    textoption: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'options_answers',
  });
  return options_answers;
};