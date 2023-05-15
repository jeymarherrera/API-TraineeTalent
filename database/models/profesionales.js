'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profesionales extends Model {
    static associate(models) {
      profesionales.belongsTo(models.direcciones, {
        as: "direccionProfesional",
        foreignKey: "id_direccion",
        onDelete: "CASCADE",
      });
    }
  }
  profesionales.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    telefono: DataTypes.STRING,
    expectativa_salarial: DataTypes.INTEGER,
    disponibilidad: DataTypes.INTEGER,
    foto: DataTypes.STRING,
    id_direccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profesionales',
  });
  return profesionales;
};