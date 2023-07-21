const { sequelize } = require("../database/models");
const { DB } = require("./config");
const { Sequelize } = require("sequelize");

const db = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.DIALECT,
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas (o reiniciadas) exitosamente.');
  })
  .catch((error) => {
    console.error('Error al crear (o reiniciar) las tablas:', error);
  });


module.exports = { db:sequelize };
