const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../../database/models");
const { JWT } = require("../../config/config");

const login = async (req, res) => {
    try {
        const { body } = req;

        const findEmail = await models.credentials.findOne({ where: { email: body.email } });
        let findUser;

       
        if (findEmail) {
            findUser = await models.professionals.findOne({ where: { credentialsId: findEmail.id } });

            if (!findUser) {
                findUser = await models.companies.findOne({ where: { credentialsId: findEmail.id } });
            }
        }

        if (!findUser) {
            return res.status(400).json({ message: 'No se encontró este usuario' });
        }

        if (!bcrypt.compareSync(body.password, findEmail.password))
            return res.status(404).send("Contraseña incorrecta!");

        delete findUser.dataValues.password;

        const token = jwt.sign({ userId: findUser.id }, JWT.SEED, { expiresIn: JWT.EXPIRES });
        console.log(token)

        return res.status(200).send({ data: findUser, token: token });

    } catch (error) {
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error en el servidor");
    }
}

module.exports = { login };