const bcrypt = require("bcryptjs");
const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");


const addAdmin = async (req, res) => {
    try {
        const { body } = req;


        const findEmail = await models.credentials.findOne({ where: { email: body.email } });

        if (findEmail) {
            res.json({ message: 'Correo en uso!' });
        }
        else {

            password = bcrypt.hashSync(body.password, 10);
            const credential = await models.credentials.create({
                email: body.email,
                password,
                role: "Admin",
            });

            const address = await models.addresses.create({
                country: body.country,
            });

            const company = await models.companies.create({
                name: body.name,
                credentialsId: credential.id,
                addressesId: address.id
            });

            return res.status(201).send(company);
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error interno en el servidor");
    }
};

module.exports = {
    addAdmin
};