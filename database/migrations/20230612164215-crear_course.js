'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      youwilllearn: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      precio: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING(999999),
      },
      recomended:{
        type: Sequelize.BOOLEAN,
        default: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  },
};