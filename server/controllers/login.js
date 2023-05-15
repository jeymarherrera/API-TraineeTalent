const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../../database/models");
const { JWT } = require("../../config/config");

const loginProfesionales = async (req, res) => {
    try {
        const { body } = req;

        const buscarUsuario = await models.profesionales.findOne({
            where: {
                correo: body.correo,
            },
        });
       
        if (!buscarUsuario)
            return res.status(404).send("No se encontró el correo");

        if (!bcrypt.compareSync(body.contrasena, buscarUsuario.contrasena))
            return res.status(404).send("Contraseña incorrecta!");
        
        delete buscarUsuario.dataValues.contrasena;

        const token = jwt.sign({ userId: buscarUsuario.id }, JWT.SEED, {
            expiresIn: JWT.EXPIRES,
        });

        return res.status(200).send({ data: buscarUsuario, token: token });

    } catch (error) {
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error en el servidor");
    }
}

const loginEmpresas = async (req, res) => {
    try {
        const { body } = req;

        const buscarUsuario = await models.empresas.findOne({
            where: {
                correo_administrador: body.correo_administrador,
            },
        });
       
        if (!buscarUsuario)
            return res.status(404).send("No se encontró el correo");

        if (!bcrypt.compareSync(body.contrasena, buscarUsuario.contrasena))
            return res.status(404).send("Contraseña incorrecta!");
        
        delete buscarUsuario.dataValues.contrasena;

        const token = jwt.sign({ userId: buscarUsuario.id }, JWT.SEED, {
            expiresIn: JWT.EXPIRES,
        });

        return res.status(200).send({ data: buscarUsuario, token: token });

    } catch (error) {
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error en el servidor");
    }
}

module.exports = { loginProfesionales, loginEmpresas };