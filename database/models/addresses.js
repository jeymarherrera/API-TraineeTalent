'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    static associate(models) {

      addresses.hasOne(models.companies,{
        as: "addressesCompanies",
        foreignKey: "addressesId",
        onDelete: "CASCADE",
      });
    }
  }
  addresses.init({
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};