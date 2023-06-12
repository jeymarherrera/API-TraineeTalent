'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class course extends Model {
        static associate(models) {

            course.hasMany(models.task, {
                as: "courseTask",
                foreignKey: "courseid",
                onDelete: "CASCADE",
            });
        }
    }
    course.init({
        title: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'course',
    });
    return course;
};