'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      courseid: {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },

        //campos de pablo
        youwilllearn: {
          type: Sequelize.ARRAY(DataTypes.STRING)
        },
        description: {
          type: Sequelize.STRING,
        },
        level: {
          type: Sequelize.STRING
        },
        image: {
          type: Sequelize.STRING(99999)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }

      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
