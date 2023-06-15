'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topics extends Model {
    static associate(models) {

      topics.belongsTo(models.chapters, {
        as: "topicsChapters",
        foreignKey: "chapterid",
        onDelete: "CASCADE",
      });

      /*topics.belongsTo(models.courses,{
        as: "topicsCourse",
        foreignKey: "courseid",
        onDelete: "CASCADE",
      });*/
    }
  }
  topics.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'topics',
  });
  return topics;
};