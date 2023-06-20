'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professionals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
            profesion: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      phone: {
        type: Sequelize.STRING
      },
      identification: {
        type: Sequelize.STRING
      },
      salary_expectation: {
        type: Sequelize.INTEGER
      },
      availability: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
            aboutme: {
        type: Sequelize.STRING
      },
                  social_link: {
        type: Sequelize.STRING
      },
            social_git: {
        type: Sequelize.STRING
      },
            cv_me: {
        type: Sequelize.STRING
      },
      credentialsId: {
        type: Sequelize.INTEGER,
        references: {
          model: "credentials",
          key: "id",
        },
        onDeleted: "CASCADE",
        onUpdated: "CASCADE",
      },
      addressesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "addresses",
          key: "id",
        },
        onDeleted: "CASCADE",
        onUpdated: "CASCADE",
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
    await queryInterface.dropTable('professionals');
  }
};