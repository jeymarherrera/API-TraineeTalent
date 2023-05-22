const { login } = require("../controllers/login");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany } = require("../controllers/companies");
const { verifyToken } = require("../middlewares/auth");
const {Router} = require("express");

const router = Router();
//registro
router.post("/registrarProfesional", addProfessional);
router.post("/registrarEmpresa", addCompany);

//login
router.post("/login", login);

//editar Perfil
router.post("/editarPerfilProfesional", verifyToken, editProfileProfessional);

module.exports = {router};