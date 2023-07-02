const { login } = require("../controllers/login");
const { recoverByEmail } = require("../controllers/recoverPassword");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addCompany, getAllProjects, getSelectedProject } = require("../controllers/companies");
const { getProfessionals } = require("../controllers/getProfessionals");
const { verifyToken } = require("../middlewares/auth");
const { createCourse,
    getAllCourses,
    createChapter,
    createtask,
    deleteCourse,
    deletetaks,
    getAllTasks,
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
router.post("/crearCapitulo", createChapter);
router.get("/listarcursos", getAllCourses);
router.get("/traerCursoSeleccionado/:id", getSelectedCourse)
router.post("/borrarcurso/:id", deleteCourse);
// router.post("/editarcurso/:id", updateCourse);
//cursos - adminitracion de talleres del curso
router.post("/creartask/:id", createtask);
router.post("/borrartask/:id", deletetaks);
router.get("/traertask", getAllTasks);

//Reclutamiento de profesionales
router.get("/traerProfesionales", getProfessionals);


router.get("/verifyToken", verifyToken);

//postulaciones
router.get('/projects',verifyToken, getAllProjects)

router.get('/project/:id', getSelectedProject)

//paypal
router.post('/pay', pay);
router.get('/success', success)


//canasta de compras
router.post('/cart/add', addProduct)
router.get('/cart', getAllProducts)
router.delete('/cart/remove/:id', removeProduct)
module.exports = {router};
