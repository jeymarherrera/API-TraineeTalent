'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chapters extends Model {
    static associate(models) {
   
      chapters.hasMany(models.topics,{
        as: "chaptersTopics",
        foreignKey: "chapterid",
        onDelete: "CASCADE",
      });

      chapters.belongsTo(models.courses, {
        as: "chaptersCourse",
        foreignKey: "courseid",
        onDelete: "CASCADE",
      });
    }
  }
  chapters.init({
    title: DataTypes.STRING,
    chapternum: DataTypes.STRING,
    courseid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'chapters',
  });
  return chapters;
};