'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class questions extends Model {
    static associate(models) {
      questions.belongsTo(models.tasks, {
        as: 'questionTask',
        foreignKey: 'taskid',
        onDelete: 'CASCADE',
      });
    }
  }

  questions.init(
    {
      question: DataTypes.STRING,
      opciones: DataTypes.ARRAY(DataTypes.STRING),
      correcta: DataTypes.STRING,
      feedback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'questions',
    }
  );

  return questions;
};
