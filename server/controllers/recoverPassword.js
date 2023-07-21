const models = require("../../database/models");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const emailService = require('../../server/services/emailServices');

const recoverByEmail = async (req, res) => {
    try {
        const { body } = req;

        const findEmail = await models.credentials.findOne({ where: { email: body.email} });
        let findUser;

        if (findEmail) {
            findUser = await models.professionals.findOne({ where: { credentialsId: findEmail.id } });

            if (!findUser) {
                findUser = await models.companies.findOne({ where: { credentialsId: findEmail.id } });
            }
        }
        
        if (!findUser) {
            return res.status(400).json({ message: 'Correo no encontrado' });
        }

        const randomKey = crypto.randomBytes(5).toString('hex');
        password = bcrypt.hashSync(randomKey, 10);
        await findEmail.update({
            password,
        });

        emailService.sendPasswordEmail(findEmail.email, randomKey);
        res.json({ message: 'Se ha enviado un enlace para iniciar sesión a su correo electrónico' });

    } catch (error) {
        console.error(error);
        res.status(500).send("Lo sentimos ha ocurrido un error en el servidor");
    }
};


module.exports = { recoverByEmail };