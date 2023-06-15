const { login } = require("../controllers/login");
const { recoverByEmail } = require("../controllers/recoverPassword");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany } = require("../controllers/companies");
const { verifyToken } = require("../middlewares/auth");
const { createCourse,
    getAllCourses,
    createChapter,
    getSelectedCourse,
    createtask,
    deleteCourse,
    deletetaks,
    getAllTasks,
} = require("../controllers/course");

const { Router } = require("express");
const router = Router();

//registro
router.post("/registrarProfesional", addProfessional);
router.post("/registrarEmpresa", addCompany);

//login
router.post("/login", login);

//recuperar contrasena
router.post("/recuperarContrasena", recoverByEmail);

//editar Perfil
router.post("/editarPerfilProfesional", verifyToken, editProfileProfessional);
//cursos - adminitracion de  un curso
router.post("/crearcursos", createCourse);
router.post("/crearCapitulo", createChapter);
router.get("/listarcursos", getAllCourses);
router.get("/traerCursoSeleccionado/:id", getSelectedCourse)
router.post("/borrarcurso/:id", deleteCourse);
// router.post("/editarcurso/:id", updateCourse);
//cursos - adminitracion de talleres del curso
router.post("/creartask/:id", createtask);
router.post("/borrartask/:id", deletetaks);
router.get("/traertask", getAllTasks);



router.get("/verifyToken", verifyToken);

module.exports = { router };