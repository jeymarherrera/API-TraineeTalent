'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('professionals', 'educacionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'educacion',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('professionals', 'educacionId');
  }
};