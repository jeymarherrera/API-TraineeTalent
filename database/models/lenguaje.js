'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lenguaje extends Model {
    static associate(models) {
      lenguaje.hasOne(models.areas, {
        as: "lenguajeProfessionals",
        foreignKey: "areaId",
        onDelete: "CASCADE",
      });
    }
  }
  lenguaje.init({
    titulo: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'lenguaje',
  });
  return lenguaje;
};