'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('areas', 'lenguajesId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'lenguajes',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('areas', 'lenguajesId');
  }
};