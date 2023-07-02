'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class areas extends Model {
    static associate(models) {
      areas.belongsTo(models.professionals, {
        as: "areasProfessionals",
        foreignKey: "professionalsId",
        onDelete: "CASCADE",
      });
       areas.belongsTo(models.lenguaje, {
        as: "lenguajeProfessionals",
        foreignKey: "lenguajesId",
        onDelete: "CASCADE",
      });
    }
  }
  areas.init({
    professionalsId: DataTypes.INTEGER,
    lenguajesId: DataTypes.INTEGER,
    experiencia: DataTypes.STRING,
    Aru_vue: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'areas',
  });
  return areas;
};