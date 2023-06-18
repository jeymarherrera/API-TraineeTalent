'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.companies, {
        as: "company",
        foreignKey: "companyId",
        onDelete: "CASCADE",
      });
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    employmentType: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    location: DataTypes.STRING,
    experienceLevel: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    statusDelete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
