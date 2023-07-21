require("dotenv").config();

const nodemailer = require('nodemailer');

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});


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
    SSL: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  JWT:{
    SEED: process.env.JWT_SEED,
    EXPIRES: process.env.JWT_EXPIRES
  },
  TRANSPORTER: transporter,

  paypal
};
