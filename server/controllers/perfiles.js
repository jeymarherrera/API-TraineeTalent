const models = require("../../database/models");

const editarPerfilProfesional = async (req, res) => {
    try {
      const { body, userId } = req;
  
      /* let foto = fileUpload(body.foto, "/public");
      foto = `http://localhost:5050${foto}`; */
  
      const area = await models.areas.create({
        area_interes: body.area_interes,
        userId
    });

/*       const direccion = await models.direcciones.create({
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
  
      delete profesional.dataValues.contrasena; */
  
      return res.status(201).send(area);
    } catch (error) {
      return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
  };

  module.exports = { editarPerfilProfesional };  