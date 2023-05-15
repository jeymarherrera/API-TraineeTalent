const { registroProfesionales } = require("../controllers/profesionales");
const { registroEmpresas} = require("../controllers/empresas");
const { editarPerfilProfesional } = require("../controllers/perfiles");
const { loginProfesionales, loginEmpresas } = require("../controllers/login");
const {verificarToken} = require("../middlewares/auth");
const {Router} = require("express");

const router = Router();
//registro
router.post("/registrarProfesional", registroProfesionales);
router.post("/registrarEmpresa", registroEmpresas);

//login
router.post("/loginProfesional", loginProfesionales);
router.post("/loginEmpresa", loginEmpresas);

//perfil
router.post("/editarPerfil", verificarToken, editarPerfilProfesional);

module.exports = {router};