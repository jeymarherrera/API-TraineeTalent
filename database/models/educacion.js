'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class educacion extends Model {
    static associate(models) {
      educacion.hasOne(models.professionals, {
        as: 'educacionProfessionals',
        foreignKey: 'educacionId',
        onDelete: 'CASCADE',
      });
    }
  }
  educacion.init({
    nombre: DataTypes.STRING,
    titulo: DataTypes.STRING,
      ini_mont: DataTypes.STRING,
        ini_year: DataTypes.INTEGER,
      end_mont: DataTypes.STRING,
        end_year: DataTypes.INTEGER,

    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'educacion',
  });
  return educacion;
};