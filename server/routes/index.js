const { login } = require("../controllers/login");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany } = require("../controllers/companies");
const { verifyToken } = require("../middlewares/auth");
const {createCourse, updateCourse, deleteCourse , getCourses} = require("../controllers/course");

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
router.post("/crearCurso", createCourse);
router.post("editarCurso", updateCourse);
router.post("/borrarCurso", deleteCourse);
router.get("/cursos",  getCourses);
//cursos - adminitracion de talleres del curso

module.exports = {router};