'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('task',{
      idtask:{
        allowNull: false,
        autoIncrement:true,
        primaryKey:true,
        type: Sequelize.INTEGER
      },
      title:{
        type: Sequelize.STRING,
      },
      description:{
        type: Sequelize.STRING,
      },
      image:{
        type: Sequelize.STRING,
      },
      fecha:{
        allowNull: false,
        type: Sequelize.DATE
      },
      courseid:{
        type: Sequelize.INTEGER,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('task');
  }
};
