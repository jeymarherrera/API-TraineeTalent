'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class direcciones extends Model {
    static associate(models) {
      direcciones.hasOne(models.profesionales,{
        as: "direccionProfesional",
        foreignKey: "id_direccion",
        onDelete: "CASCADE",
      });
      direcciones.hasOne(models.empresas,{
        as: "direccionEmpresas",
        foreignKey: "id_direccion",
        onDelete: "CASCADE",
      });
    }
  }
  direcciones.init({
    pais: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    calle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'direcciones',
  });
  return direcciones;
};