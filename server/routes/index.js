const { login } = require("../controllers/login");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany } = require("../controllers/companies");
const { verifyToken } = require("../middlewares/auth");
const {createCourse, getAllCourses} = require("../controllers/course");

const {Router} = require("express");

const router = Router();

//registro
router.post("/registrarProfesional", addProfessional);
router.post("/registrarEmpresa", addCompany);

//login
router.post("/login", login);

//editar Perfil
router.post("/editarPerfilProfesional", verifyToken, editProfileProfessional);
//cursos - adminitracion de un curso
router.post("/crearcursos", createCourse);
router.get("/traercursos", getAllCourses);

//cursos - adminitracion de talleres del curso

module.exports = {router};