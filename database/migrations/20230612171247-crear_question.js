'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('question', {
      idquestion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING,
      },
      taskid: {
        type: Sequelize.INTEGER,
        references: {
          model: "task",
          key: "idtask",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('question');
  }
};
