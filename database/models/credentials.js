'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credentials extends Model {
    static associate(models) {
   
      credentials.hasOne(models.companies,{
        as: "credentialsCompanies",
        foreignKey: "credentialsId",
        onDelete: "CASCADE",
      });
    }
  }
  credentials.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'credentials',
  });
  return credentials;
};