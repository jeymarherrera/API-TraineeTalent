const bcrypt = require("bcryptjs");
const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const registroEmpresas = async (req, res) => {
  try {
    const { body } = req;

    /* let foto = fileUpload(body.foto, "/public");
    foto = `http://localhost:5050${foto}`; */

    const direccion = await models.direcciones.create({
      pais: body.pais,
      ciudad: body.ciudad,
      provincia: body.provincia,
      calle: body.calle,
    });

    contrasena = bcrypt.hashSync(body.contrasena, 10);
    const empresa = await models.empresas.create({
      nombre: body.nombre,
      correo_administrador: body.correo_administrador,
      contrasena: contrasena,
      sector: body.sector,
      //foto,
      foto: body.foto,
      id_direccion: direccion.id,
    });

    delete empresa.dataValues.contrasena;

    return res.status(201).send({ empresa: empresa, direccion: direccion });
  } catch (error) {
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

/* const eliminarEmpresa = async (req, res) => {
  try {
    const { empresaId } = req.params;

    const empresa = await models.empresas.findOne({
      where: {
        id: empresaId,
        statusDelete: false,
      },
    });

    if (!empresa) return res.status(404).send("La empresa no se encontró");

    await empresa.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado exitosamente.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
}; */

module.exports = { registroEmpresas };
