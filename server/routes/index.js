const { login } = require("../controllers/login");
const { recoverByEmail } = require("../controllers/recoverPassword");
const { addProfessional, editProfileProfessional } = require("../controllers/professionals");
const { addAdmin} = require("../controllers/admin");

const { addCompany, getAllProjects, getSelectedProject } = require("../controllers/companies");
const { getProfessionals, getAllProfessionals } = require("../controllers/getProfessionals");
const { lenguajesP } = require("../controllers/lenguajes");
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
    getSavedCourses,
} = require("../controllers/course");
const { pay, success } = require("../controllers/paypal");
const { EditarPerfilE , EditarPerfilP, Habilidad,subirpdf, getAllPerfil } = require("../controllers/perfil");
const { getSelectedCourse } = require("../controllers/infoCourse")


const { Router } = require("express");
const { addProduct, getCartContent, getAllProducts, removeProduct } = require("../controllers/cart");
const router = Router();
const multer = require('multer');
const path = require('path'); 



// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // Ruta de la carpeta 'public' donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

const upload = multer({ storage });



//registro
router.post("/registrarProfesional", addProfessional);
router.post("/registrarAdmin", addAdmin);
router.post("/registrarEmpresa", addCompany);

//login
router.post("/login", login);

//recuperar contrasena
router.post("/recuperarContrasena", recoverByEmail);

//editar Perfil
router.post("/editarPerfilProfesional/:id", EditarPerfilE);
router.post("/editarPerfilProfesional2/:id", EditarPerfilP);
router.post("/editarPerfilProfesional3/:id", Habilidad);
router.get("/traerperfil/:id", getAllPerfil)


//SUBIR PDF
const currentDirectory = path.dirname(require.main.filename);
router.post('/api/upload/:id', upload.single('pdfFile'), (req, res) => {
  subirpdf(req, res, currentDirectory); // Pasamos currentDirectory como argumento a subirpdf
});


//Lenguaje
router.post("/lenguajes", lenguajesP);

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

//cursos comprados
router.post("/traerCursoComprado/",verifyToken, getSavedCourses);

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
