const models = require("../../database/models");
const emailService = require('../../server/services/emailServices');

const notificacionProfesional = async (req, res) => {
    try {
        const { id } = req.params;

        const findEmail = await models.credentials.findOne({ where: { id: id, statusDelete: false } });
        console.log(findEmail.email)
        emailService.sendNotificacionProfesional(findEmail.email);
        res.json({ message: 'Se ha enviado un enlace para iniciar sesión a su correo electrónico' });

    } catch (error) {
        console.error(error);
        res.status(500).send("Lo sentimos ha ocurrido un error en el servidor");
    }
};


module.exports = { notificacionProfesional };