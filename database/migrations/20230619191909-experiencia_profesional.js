'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('experiencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.STRING
      },
            titulo: {
        type: Sequelize.STRING
      },
                  locacion: {
        type: Sequelize.STRING
      },
                   ini_mont: {
        type: Sequelize.STRING
      },
      ini_year: {
        type: Sequelize.STRING
      },
            end_mont: {
        type: Sequelize.STRING
      },
     end_year: {
        type: Sequelize.STRING
      },
                  
      statusDelete: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('experiencia');
  }
};