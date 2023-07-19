const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");
const { esImagenBase64 } = require("../utils/imageBase");
const { where } = require("sequelize");
const jwt = require("jsonwebtoken");

// Controlador para crear un nuevo curso

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, level, youwilllearn, image, precio } = req.body;
    console.log("imagen: "+image)
    // Verifica si el curso existe en la base de datos
    const course = await models.courses.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // Actualiza los campos del curso
    course.title = title;
    course.precio = precio;
    course.description = description;
    course.level = level;
    course.youwilllearn = youwilllearn;

    if (esImagenBase64(image)) {
      console.log("es base64");
      const imageUrl = await fileUpload(image, "/public");
      course.image = `${process.env.APP_BASE_URL}${imageUrl}`;
    } else {
      console.log("no es base64, es String")
      course.image = image;
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: course
    });
  } catch (error) {
    console.error('Error al editar el curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar el curso',
      error: error.message
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    console.log("entre ACA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    // Verifica si la tarea existe en la base de datos
    const task = await models.tasks.findByPk(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    // Actualiza los datos de la tarea
    task.title = title;
    task.description = description;
    
    if (esImagenBase64(image)) {
      console.log("Es base64");
      const imageRoute = fileUpload(image, "/public");
      task.image = `${process.env.APP_BASE_URL}${imageRoute}`;
    } else {
      task.image = image;
    }

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: task
    });
  } catch (error) {
    console.error('Error al editar la tarea:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar la tarea',
      error: error.message
    });
  }
};




const createCourse = async (req, res) => {
  try {
    const { body } = req;
    console.log(body.data);
    let image = await fileUpload(body.image, "/public");
    console.log(image);

    image = `${process.env.APP_BASE_URL}${image}`;

    // Crea el nuevo curso en la base de datos
    const course = await models.courses.create({
      title: body.title,
      precio: body.precio,
      description: body.description,
      image,
      level: body.level,
      youwilllearn: body.youwilllearn
    });

    return res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: course
    });

  } catch (error) {
    console.error('Error al crear el curso:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el curso',
      error: error.message
    });
  }
};





const getAllCourses = async (req, res) => {
  try {
    // Obtiene todos los cursos de la base de datos
    const courses = await models.courses.findAll()

    res.status(200).json({
      success: true,
      message: 'Cursos obtenidos exitosamente',
      data: courses
    });
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los cursos',
      error: error.message
    });
  }
};


const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si el curso existe en la base de datos
    const course = await models.courses.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // Elimina el curso de la base de datos
    await course.destroy();

    res.status(200).json({

      success: true,
      message: 'Curso eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el curso',
      error: error.message
    });
  }
};



//task

const createtask = async (req, res) => {
  try {
    
    const { id } = req.params;

    console.log("id del curso : "+id)
    const { title } = req.body;
    const { description } = req.body;
    const { image } = req.body;
    let _image = fileUpload(image, "/public");
    _image = `${process.env.APP_BASE_URL}${_image}`;
    const findcourse = await models.courses.findByPk(id)
    if (!findcourse) {
      res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    } else {
      const task = await models.tasks.create({
        title,
        description,
        image: _image,
        courseid: id
      })
      return res.status(201).send(task)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el curso',
      error: error.message
    });
  }
}

const deletetaks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await models.tasks.findByPk(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'task no encontrado'
      });
    }
    await task.destroy();

    res.status(200).json({
      success: true,
      message: 'Task eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el curso',
      error: error.message
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    // Obtiene todos los cursos de la base de datos
    const task = await models.tasks.findAll();

    res.status(200).json({
      success: true,
      message: 'talleres obtenidos exitosamente',
      data: task
    });
    console.log(task)
  } catch (error) {
    console.error('Error al obtener los talleres:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los talleres',
      error: error.message
    });
  }
};

const getAllQuestionsByTask = async (req, res) => {
  const { taskid } = req.params;
  console.log('taskid:', taskid); // Verifica el valor de taskid aquí

  try {
    const questions = await models.questions.findAll({
      where: { taskid: taskid }, // Asegúrate de pasar el valor correcto de taskid aquí
    });

    console.log('Questions:', questions); // Verifica la respuesta de la consulta aquí

    res.status(200).json({
      success: true,
      message: 'Questions obtenidos exitosamente',
      data: questions,
    });
  } catch (error) {
    console.error('Error al obtener las preguntas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las preguntas',
      error: error.message,
    });
  }
};


const createQuestions = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    console.log(id);
    // Crea la nueva pregunta en la base de datos
    const question = await models.questions.create({
      question: body.question,
      opciones: body.opciones,
      correcta: body.correcta,
      feedback: body.feedback, // Corregir la propiedad a 'feddback'
      taskid: id,
    });

    return res.status(201).json({
      success: true,
      message: 'Pregunta creada exitosamente',
      data: question,
    });
  } catch (error) {
    console.error('Error al crear la pregunta:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la pregunta',
      error: error.message,
    });
  }
};


const getSavedCourses = async (req, res) => {
  
  const token = req.headers['x-auth-token']; // Obtén el token del encabezado de la solicitud
  try{
    const decodedToken = jwt.decode(token); 
    const userid = decodedToken.userId
    console.log("id : "+userid)

    const purchasesWithCourses = await models.purchases.findAll({
      include: [models.courses], // Incluye el modelo Course en la consulta para el INNER JOIN
      where: { professionalId: userid  }, // Condición para filtrar por el userId
    });
  
    if (purchasesWithCourses.length > 0) {
      console.log("Tiene cursos comprados con información de los cursos:");
      console.log(purchasesWithCourses);
      return res.status(201).json({
        success: true,
        message: 'cursos comprados obtenidos exitosamente',
        data: purchasesWithCourses,
      });
    } else {  
      console.log("No tiene cursos comprados");
    }

  }catch (error) {
    console.log(error);
    res.status(401).json({ message: 'id inválido' });
  }


}





//Metodos para Capitulos, temas

module.exports = {
  updateTask,
  getAllQuestionsByTask,
  createQuestions,
  updateCourse,
  createCourse,
  getAllCourses,
  deleteCourse,
  createtask,
  deletetaks,
  getAllTasks,
  getSavedCourses,
}