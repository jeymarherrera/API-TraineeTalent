require("dotenv").config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
});

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
  JWT:{
    SEED: process.env.JWT_SEED,
    EXPIRES: process.env.JWT_EXPIRES
  },
  TRANSPORTER: transporter
};
