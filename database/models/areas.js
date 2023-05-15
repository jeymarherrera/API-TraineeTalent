'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class areas extends Model {
    static associate(models) {
      areas.belongsTo(models.profesionales, {
        as: "areasProfesional",
        foreignKey: "id_profesional",
        onDelete: "CASCADE",
      });
    }
  }
  areas.init({
    area_interes: DataTypes.STRING,
    id_profesional: DataTypes.INTEGER,
    status_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'areas',
  });
  return areas;
};