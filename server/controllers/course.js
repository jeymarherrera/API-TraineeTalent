const models = require('../../database/models/');

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


module.exports = {
  createCourse,
  getAllCourses
}