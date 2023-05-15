'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      area_interes: {
        type: Sequelize.STRING
      },
      id_profesional: {
        type: Sequelize.INTEGER,
        references:{
          model:'profesionales',
          key:'id'
        },
        onDeleted:'CASCADE',
        onUpdated:'CASCADE'
      },
      status_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('areas');
  }
};