'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresas extends Model {
    static associate(models) {
      empresas.belongsTo(models.direcciones, {
        as: "direccionEmpresas",
        foreignKey: "id_direccion",
        onDelete: "CASCADE",
      });
    }
  }
  empresas.init({
    nombre: DataTypes.STRING,
    correo_administrador: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    sector: DataTypes.STRING,
    foto: DataTypes.STRING,
    id_direccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'empresas',
  });
  return empresas;
};