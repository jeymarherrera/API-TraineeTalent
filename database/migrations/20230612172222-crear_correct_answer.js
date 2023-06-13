'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('correct_answer', {
      idanswer: {
        llowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feedback:{
        type: Sequelize.STRING,
      },
      optionid:{
        type: Sequelize.INTEGER,
        references:{
          model: "options_answers",
          key: "idoption",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('correct_answer');
  }
};
