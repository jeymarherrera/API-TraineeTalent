const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../../database/models");
const { JWT } = require("../../config/config");

const login = async (req, res) => {
    try {
        const { body } = req;
        console.log(body)
        const findUser = await models.users.findOne({
            where: {
                email: body.email,
            },
        });

       
        if (!findUser)
            return res.status(404).send("No se encontró el correo");

        if (!bcrypt.compareSync(body.password, findUser.password))
            return res.status(404).send("Contraseña incorrecta!");
        
        delete findUser.dataValues.password;

        const token = jwt.sign({ userId: findUser.id }, JWT.SEED, {
            expiresIn: JWT.EXPIRES,
        });

        return res.status(200).send({ data: findUser, token: token });

    } catch (error) {
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error en el servidor");
    }
}

module.exports = { login };