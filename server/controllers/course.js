const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");
const { esImagenBase64 } = require("../utils/imageBase")
// Controlador para crear un nuevo curso

const updateCourse = async (req, res) => {
  try {
    const { id, title, description, level, youwilllearn, image } = req.params;

    

    // Verifica si el curso existe en la base de datos
    const course = await models.courses.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // Actualiza el título del curso
    course.title = title;

    let _image = ""
    if (esImagenBase64(image)) {
      _image = fileUpload(image, "/public");
      _image = `${process.env.APP_BASE_URL}${_image}`;
      course.image = _image;

    } else {
      course.image = image;
    }

    
    course.description = description;
    course.level = level;
    course.youwilllearn = youwilllearn;
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

const createCourse = async (req, res) => {
  try {
    const { body } = req;
    console.log(body.data)
    let image = fileUpload(body.image, "/public");
    console.log(image)

    image = `${process.env.APP_BASE_URL}${image}`;

    // Crea el nuevo curso en la base de datos
    const course = await models.courses.create({
      title: body.title,
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
    res.status(500).json({
      success: false,
      message: 'Error al crear el curso',
      error: error.message,
    });
  }
};
const getAllCourses = async (req, res) => {
  try {
    // Obtiene todos los cursos de la base de datos
    const courses = await models.courses.findAll();

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
  } catch (error) {
    console.error('Error al obtener los talleres:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los talleres',
      error: error.message
    });
  }
};

//Metodos para Capitulos, temas

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  createtask,
  deletetaks,
  getAllTasks,
}