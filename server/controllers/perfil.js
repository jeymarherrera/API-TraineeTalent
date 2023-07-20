const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");
const fs = require('fs');
const path = require('path');
// Controlador 
const publicFolderPath = path.resolve(__dirname, '../../public');


const EditarPerfilE = async (req, res) => {
  try {
    const { id } = req.params;
    const educacion = await models.educacions.findByPk(id);
    const experiencia = await models.experiencia.findByPk(id);
    const direccion = await models.addresses.findByPk(id);

    if (educacion) {
      const { nombre2, titulo, ini_mont, ini_year, end_mont, end_year } = req.body;

      educacion.nombre = nombre2;
      educacion.titulo = titulo;
      educacion.ini_mont = ini_mont;
      educacion.ini_year = ini_year;
      educacion.end_mont = end_mont;
      educacion.end_year = end_year;

      await educacion.save();

      if (!experiencia) {
    res.status(200).json({
        success: true,
        message: 'Datos Actualizados',
        data: educacion
      });

}
if (experiencia) {
      const { company, titulo2, locacion, ini_mont2, ini_year2, end_mont2, end_year2 } = req.body;
      experiencia.company = company;
      experiencia.titulo = titulo2;
      experiencia.locacion = locacion;
      experiencia.ini_mont = ini_mont2;
      experiencia.ini_year = ini_year2;
      experiencia.end_mont = end_mont2;
      experiencia.end_year = end_year2;
      await experiencia.save();
      }
      if (direccion) {
      const { country, city } = req.body;
      direccion.country = country;
      direccion.city = city;
      await direccion.save();
    }

      res.status(200).json({
        success: true,
        message: 'Datos Actualizados',
        data: educacion
      });



    }  else {
      res.status(404).json({
        success: false,
        message: 'No existe educacion ni experiencia con el ID proporcionado'
      });
    }
  } catch (error) {
    console.error('Error al editar los datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar los datos',
      error: error.message
    });
  }
};


const EditarPerfilP = async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await models.professionals.findByPk(id);

    if (personal) {
      const { nombre3, profesion, phone, aboutme, social_link, social_git } = req.body;

      personal.nombre = nombre3;
      personal.profesion = profesion;
      personal.phone = phone;
      personal.aboutme = aboutme;
      personal.social_link = social_link;
      personal.social_git = social_git;

      await personal.save();

      res.status(200).json({
        success: true,
        message: 'Datos Actualizados',
        data: personal
      });



    }  else {
      res.status(404).json({
        success: false,
        message: 'No existe educacion ni experiencia con el ID proporcionado'
      });
    }
  } catch (error) {
    console.error('Error al editar los datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar los datos',
      error: error.message
    });
  }
};

const Habilidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { professionalsId, areaId, experiencia, Aru_vue } = req.body;

const area = await models.areas.findOne({
  where: { professionalsId: id } 
});
    if (!area) {
      area = await models.areas.create({
        professionalsId: professionalsId,
        areaId: areaId,
        experiencia: experiencia,
        Aru_vue: Aru_vue
      });

      return res.status(201).json({
        success: true,
        message: 'Área creada exitosamente',
        data: area
      });
    }

    area.professionalsId = professionalsId;
    area.areaId = areaId;
    area.experiencia = experiencia;
    area.Aru_vue = Aru_vue;

    await area.save();

    res.status(200).json({
      success: true,
      message: 'Datos actualizados',
      data: area
    });
  } catch (error) {
    console.error('Error al editar los datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar los datos',
      error: error.message
    });
  }
};

const subirpdf = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo PDF',
      });
    }

    const existingProfessional = await models.professionals.findByPk(id);

    const pdfFilePath = '../../public/' + file.filename; // Ruta del archivo PDF en la carpeta pública
    console.log('Titulo:', req.body.titulo);
    console.log('PDF File Path:', pdfFilePath);

    if (existingProfessional) {
      existingProfessional.cv_me = req.body.titulo;
      existingProfessional.pdfFileName = file.filename; // Guarda el nombre del archivo en la base de datos
      await existingProfessional.save();
    } else {
      await models.professionals.create({
        cv_me: req.body.titulo,
        pdfFileName: file.filename, // Guarda el nombre del archivo en la base de datos
      });
    }

    res.status(200).json({
      success: true,
      message: 'PDF subido correctamente',
    });
  } catch (error) {
    console.error('Error al subir el PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error al subir el PDF',
      error: error.message,
    });
  }
};

const getAllPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await models.professionals.findByPk(id);
    const educacion = await models.educacions.findByPk(id);
    const experiencia = await models.experiencia.findByPk(id);
    const direccion = await models.addresses.findByPk(id);
    const area = await models.areas.findOne({
      where: { professionalsId: id },
    });

    if (!area) {
      throw new Error('El área no fue encontrada para este usuario');
    }

    const lenguaje = await models.lenguaje.findOne({
      where: { id: area.areaId },
    });

    if (!lenguaje) {
      throw new Error('El lenguaje de área no fue encontrado');
    }

    area.dataValues.titulo = lenguaje.titulo; // Agregamos el título del lenguaje a la instancia del área

    res.status(200).json({
      success: true,
      message: 'Datos del perfil obtenidos exitosamente',
      data: {
        personal,
        educacion,
        experiencia,
        direccion,
        area,
      },
    });
  } catch (error) {
    console.error('Error al obtener los datos del perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los datos del perfil',
      error: error.message,
    });
  }
};


const getAllPerfilEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await models.companies.findByPk(id);
    const direccion = await models.addresses.findByPk(id);


    res.status(200).json({
      success: true,
      message: 'Datos del perfil obtenidos exitosamente',
      data: {
        personal,
        direccion,
      },
    });
  } catch (error) {
    console.error('Error al obtener los datos del perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los datos del perfil',
      error: error.message,
    });
  }
};

const EditarPerfilEmprea = async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await models.companies.findByPk(id);
        const direccion = await models.addresses.findByPk(id);


    if (personal) {
      const { nombre3, profesion } = req.body;

      personal.name = nombre3;
      personal.sector = profesion;
      
      await personal.save();

      

      res.status(200).json({
        success: true,
        message: 'Datos Actualizados',
        data: personal
      });

if (direccion) {
      const { country, city,street } = req.body;
      direccion.country = country;
  direccion.city = city;
        direccion.street = street;

      await direccion.save();
    }

    }  else {
      res.status(404).json({
        success: false,
        message: 'No existe Datos ni experiencia con el ID proporcionado'
      });
    }
  } catch (error) {
    console.error('Error al editar los datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al editar los datos',
      error: error.message
    });
  }
};

module.exports = {
  getAllPerfilEmpresa,
  EditarPerfilE,
  EditarPerfilP,
  Habilidad,
  subirpdf,
  getAllPerfil,
  EditarPerfilEmprea
}