'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chapters',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        chapternum: {
          type: Sequelize.STRING
        },
        courseid: {
          type: Sequelize.INTEGER,
          references: {
            model: "courses",
            key: "id"
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }

    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chapters');

  }
};
