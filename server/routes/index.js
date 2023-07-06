const { login } = require("../controllers/login");
const { recoverByEmail } = require("../controllers/recoverPassword");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany, getAllProjects } = require("../controllers/companies");
const { getProfessionals } = require("../controllers/getProfessionals");
const { verifyToken } = require("../middlewares/auth");
const { createCourse,
    getAllCourses,
    createtask,
    deleteCourse,
    deletetaks,
    getAllTasks,
    createQuestions,
    getAllQuestionsByTask,
} = require("../controllers/course");
const { getSelectedCourse } = require("../controllers/infoCourse")
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
router.get("/listarcursos", getAllCourses);
router.get("/traerCursoSeleccionado/:id", getSelectedCourse)
router.post("/borrarcurso/:id", deleteCourse);
// router.post("/editarcurso/:id", updateCourse);
//cursos - adminitracion de talleres del curso
router.post("/creartask/:id", createtask);
router.post("/borrartask/:id", deletetaks);
router.get("/traertask", getAllTasks);
router.post('/crearQuestion', createQuestions);
router.get('/traerquestion/:id', getAllQuestionsByTask);


//Reclutamiento de profesionales
router.get("/traerProfesionales", getProfessionals);


router.get("/verifyToken", verifyToken);

//postulaciones
router.get('/projects', getAllProjects)

module.exports = {router};
