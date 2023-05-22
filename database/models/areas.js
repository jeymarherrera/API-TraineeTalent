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
    }
  }
  areas.init({
    area_interest: DataTypes.STRING,
    professionalsId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'areas',
  });
  return areas;
};