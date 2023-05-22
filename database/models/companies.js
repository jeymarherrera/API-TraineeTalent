'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    static associate(models) {
      companies.belongsTo(models.addresses, {
        as: "addressesCompanies",
        foreignKey: "addressesId",
        onDelete: "CASCADE",
      });
      companies.belongsTo(models.credentials, {
        as: "credentialsCompanies",
        foreignKey: "credentialsId",
        onDelete: "CASCADE",
      });
    }
  }
  companies.init({
    name: DataTypes.STRING,
    sector: DataTypes.STRING,
    image: DataTypes.STRING,
    credentialsId: DataTypes.INTEGER,
    addressesId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'companies',
  });
  return companies;
};