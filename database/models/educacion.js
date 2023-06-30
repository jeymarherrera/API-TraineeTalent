'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class educacions extends Model {
    static associate(models) {
      educacions.hasOne(models.professionals, {
        as: 'educacionsProfessionals',
        foreignKey: 'educacionId',
        onDelete: 'CASCADE',
      });
    }
  }
  educacions.init({
    nombre: DataTypes.STRING,
    titulo: DataTypes.STRING,
      ini_mont: DataTypes.STRING,
        ini_year: DataTypes.INTEGER,
      end_mont: DataTypes.STRING,
        end_year: DataTypes.INTEGER,

    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'educacions',
  });
  return educacions;
};