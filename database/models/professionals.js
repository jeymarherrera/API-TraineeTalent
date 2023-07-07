'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professionals extends Model {
    static associate(models) {
      professionals.belongsTo(models.addresses, {
        as: "addressesProfessionals",
        foreignKey: "addressesId",
        onDelete: "CASCADE",
      });
            professionals.belongsTo(models.educacions, {
        as: "educacionsProfessionals",
        foreignKey: "educacionId",
        onDelete: "CASCADE",
      });
      professionals.belongsTo(models.experiencia, {
        as: "experienciaProfessionals",
        foreignKey: "experienciaId",
        onDelete: "CASCADE",
      });
      professionals.belongsTo(models.credentials, {
        as: "credentialsProfessionals",
        foreignKey: "credentialsId",
        onDelete: "CASCADE",
      });
      professionals.hasMany(models.areas, {
        as: "areasProfessionals",
        foreignKey: "professionalsId",
        onDelete: "CASCADE",
      });
    }
  }
  professionals.init({
    nombre: DataTypes.STRING,
    profesion: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    phone: DataTypes.STRING,
    identification: DataTypes.STRING,
    salary_expectation: DataTypes.INTEGER,
    availability: DataTypes.INTEGER,
    image: DataTypes.STRING,
    aboutme: DataTypes.STRING,
    social_link: DataTypes.STRING,
    social_git: DataTypes.STRING,
    cv_me: DataTypes.STRING,
    credentialsId: DataTypes.INTEGER,
    addressesId: DataTypes.INTEGER,
    educacionId: DataTypes.INTEGER,
    experienciaId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'professionals',
  });
  return professionals;
};