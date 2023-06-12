'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('options_answers',{
      idoption: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      textoption:{
        type: Sequelize.STRING,
      },
      questionid: {
        type: Sequelize.INTEGER,
        references:{
          model: "question",
          key: "idquestion",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('options_answers');
  }
};
