'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      correo_administrador: {
        type: Sequelize.STRING,
        unique: true
      },
      contrasena: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      id_direccion: {
        type: Sequelize.INTEGER,
        references:{
          model:'direcciones',
          key:'id'
        },
        onDeleted:'CASCADE',
        onUpdated:'CASCADE'
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
    await queryInterface.dropTable('empresas');
  }
};