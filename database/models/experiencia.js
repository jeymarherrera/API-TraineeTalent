'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experiencia extends Model {
    static associate(models) {

      experiencia.hasOne(models.professionals,{
        as: "experienciaProfessionals",
        foreignKey: "experienciaId",
        onDelete: "CASCADE",
      });
    }
  }
  experiencia.init({
    company: DataTypes.STRING,
      titulo: DataTypes.STRING,
        locacion: DataTypes.STRING,

      ini_mont: DataTypes.STRING,
        ini_year: DataTypes.INTEGER,
      end_mont: DataTypes.STRING,
        end_year: DataTypes.INTEGER,

    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'experiencia',
  });
  return experiencia;
};