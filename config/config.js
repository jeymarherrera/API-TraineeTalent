require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,

  DB: {
    PORT: process.env.DB_PORT || 5432,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: "postgres",
  },
};
