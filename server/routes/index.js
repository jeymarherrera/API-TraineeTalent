const { registro } = require("../controllers/users");
const { login } = require("../controllers/login");
const {verificarToken} = require("../middlewares/auth");
const {Router} = require("express");

const router = Router();
router.post("/registro", registro);
router.post("/login", login);

module.exports = {router};