const { login } = require("../controllers/login");
const { recoverByEmail } = require("../controllers/recoverPassword");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany, getAllProjects, getSelectedProject } = require("../controllers/companies");
const { getProfessionals, getAllProfessionals } = require("../controllers/getProfessionals");
const { verifyToken } = require("../middlewares/auth");
const { createCourse,
    getAllCourses,
    createtask,
    deleteCourse,
    deletetaks,
    getAllTasks,
    createQuestions,
    updateCourse,
    updateTask,
    getAllQuestionsByTask,
} = require("../controllers/course");
const { pay, success } = require("../controllers/paypal");
const { getSelectedCourse } = require("../controllers/infoCourse")


const { Router } = require("express");
const { addProduct, getCartContent, getAllProducts, removeProduct } = require("../controllers/cart");
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
router.post("/editarcurso/:id", updateCourse);
router.post("/editartask/:id", updateTask);

//cursos - adminitracion de talleres del curso
router.post("/creartask/:id", createtask);
router.post("/borrartask/:id", deletetaks);
router.get("/traertask", getAllTasks);
router.post('/crearQuestion/:id', createQuestions);
router.get('/traerquestion/:taskid', getAllQuestionsByTask);


//Reclutamiento de profesionales
router.get("/traerTodoslosProfesionales", getAllProfessionals)
router.post("/traerProfesionales", getProfessionals);


router.get("/verifyToken", verifyToken);

//postulaciones
router.get('/projects',verifyToken, getAllProjects)

router.get('/project/:id', getSelectedProject)

//paypal
router.post('/pay', pay);
router.get('/success', success)


//canasta de compras
router.post('/cart/add', verifyToken, addProduct)
router.get('/cart', getAllProducts)
router.delete('/cart/remove/:id', removeProduct)
module.exports = {router};
