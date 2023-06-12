const models = require('../../database/models');

// Controlador para insertar un nuevo curso
async function createCourse(req, res) {
  try {
    const { body } = req;
    
    // Crea un nuevo curso en la base de datos
    const newCourse = await models.course.create({ title: body.title });
    return res.status(201).send(newCourse);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el curso', error });
  }
}

// Controlador para editar un curso existente
async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const { title } = req.body;
    
    // Busca el curso por su ID en la base de datos
    const course = await models.course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Actualiza el título del curso
    await course.update({ title });

    return res.status(200).json({ message: 'Curso actualizado exitosamente', course });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el curso', error });
  }
}

// Controlador para eliminar un curso
async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    
    // Busca y elimina el curso por su ID en la base de datos
    const deletedCourse = await Course.destroy({ where: { id: courseId } });

    if (deletedCourse === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    return res.status(200).json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el curso', error });
  }
}


//controlador para traer los cursos en la base de datos

async function getCourses(req, res) {
    try {
      // Obtiene todos los cursos de la base de datos
      const course = await Course.findAll();
  
      return res.status(200).json({ course });
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
  }

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses
};
