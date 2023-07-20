'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class answers extends Model {
    static associate(models) {
      answers.belongsTo(models.questions, {
        as: 'answerQuestion',
        foreignKey: 'questionid',
        onDelete: 'CASCADE',
      });
    }
    static associate(models) {
      answers.belongsTo(models.credentials, {
        as: 'answerCredentials',
        foreignKey: 'userid',
        onDelete: 'CASCADE',
      });
    }
  }

  answers.init(
    {
      useranswer: DataTypes.STRING,
      correcta: DataTypes.STRING,
      questionid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,


    },
    {
      sequelize,
      modelName: 'answers',
    }
  );

  return answers;
};
