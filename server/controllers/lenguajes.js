const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");
// Controlador


const lenguajesP = async (req, res) => {
  try {
    const { body } = req;
    const lenguajes = await models.lenguaje.create({
      titulo: body.titulo,
      
    });

    return res.status(201).json({
      success: true,
      message: 'lenguaje creado exitosamente',
      data: lenguajes
    });


  } catch (error) {
    console.error('Error al crear el lenguajes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el lenguajes',
      error: error.message,
    });
  }
};


module.exports = {
  lenguajesP,
  
}