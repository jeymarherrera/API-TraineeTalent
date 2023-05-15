const { registro } = require("../controllers/profesionales");
const { login } = require("../controllers/login");
const {verificarToken} = require("../middlewares/auth");
const {Router} = require("express");

const router = Router();
router.post("/registro", registro);
router.post("/login", login);

module.exports = {router};