const bcrypt = require("bcryptjs");
const models = require("../../database/models");
const {fileUpload} = require("../utils/uploadFiles");

const registroProfesionales = async (req, res) => {
  try {
    const { body } = req;

    /* let foto = fileUpload(body.foto, "/public");
    foto = `http://localhost:5050${foto}`; */

    const direccion = await models.direcciones.create({
        pais:body.pais,
        ciudad:body.ciudad,
        provincia:body.provincia,
        calle:body.calle,
    });
  
    contrasena = bcrypt.hashSync(body.contrasena, 10);
    const profesional = await models.profesionales.create({
      nombre: body.nombre,
      apellido: body.apellido,
      correo: body.correo,
      contrasena: contrasena,
      telefono: body.telefono,
      expectativa_salarial: body.expectativa_salarial,
      disponibilidad: body.disponibilidad,
      //foto,
      foto: body.foto,
      id_direccion:direccion.id
    });

    delete profesional.dataValues.contrasena;

    return res.status(201).send({profesional:profesional, direccion:direccion});
  } catch (error) {
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const eliminarUsuario = async(req, res) => {
  try {
      const { userId } = req.params; 
      
      const user = await models.users.findOne({
          where: {
              id: userId,
              statusDelete: false,
          },
      });
      
      if(!user) return res.status(404).send("El usuario no se encontró");   
       
      await user.update({
         statusDelete: true,
      });

      return res.status(200).send("Se ha eliminado exitosamente.");
  } catch (error) {
      console.log(error);
      return res.status(500).send("Lo sentimos ha ocurrido un error");
  };
};

module.exports = { registroProfesionales };