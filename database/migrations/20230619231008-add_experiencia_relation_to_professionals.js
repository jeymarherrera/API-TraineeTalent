'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('professionals', 'experienciaId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'experiencia',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('professionals', 'experienciaId');
  }
};