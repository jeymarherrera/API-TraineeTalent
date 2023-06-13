const models = require('../../database/models/');
const { fileUpload } = require('../utils/uploadFiles');

// Controlador para crear un nuevo curso
const createCourse = async (req, res) => {
  try {
    const { title } = req.body;

    // Crea el nuevo curso en la base de datos
    const course = await models.courses.create({ title });

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: course
    });
  } catch (error) {
    console.error('Error al crear el curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el curso',
      error: error.message
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

const updateCourse = async (req, res) => {
  try{
    const { id } = req.params;
    const {title} = req.body;
    // Verifica si el curso existe en la base de datos
    const course = await models.courses.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    // actualiza el curso de la base de datos
    course.title = title;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Curso Actualizado exitosamente'
    });
  }catch(error){
    console.error('Error al eliminar el curso:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el curso',
      error: error.message
    });
  }
};

//task

const createtask = async (req, res) =>{
  try{
    const {id} = req.params;
    const {title} =req.body;
    const {description} = req.body;
    const {image} = req.body;
    let _image = fileUpload(image, "/public");
    _image = `${process.env.APP_BASE_URL}${_image}`;
    const findcourse = await models.courses.findByPk(id)
    if(!findcourse){
      res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }else{
      const task = await models.tasks.create({
        title,
        description, 
        _image,
      })
      return res.status(201).send(task)
    }


  }catch(error){
    console.log(error)
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  createtask,
}