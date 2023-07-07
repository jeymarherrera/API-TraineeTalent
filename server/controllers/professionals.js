const bcrypt = require("bcryptjs");
const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const addProfessional = async (req, res) => {
    try {
        const { body } = req;

        let image = fileUpload(body.image, "/public");
        image = `${process.env.APP_BASE_URL}${image}`;

        const findEmail = await models.credentials.findOne({ where: { email: body.email } });

        if (findEmail) {
            res.json({ message: 'Correo en uso!' });
        }
        else {

            password = bcrypt.hashSync(body.password, 10);
            const credential = await models.credentials.create({
                email: body.email,
                password,
                role: "Profesional",
            });

            const address = await models.addresses.create({
                country: body.country,
                city: body.city,
                state: body.state,
                street: body.street,
            });
            const experiencia = await models.experiencia.create({
                company: body.company,
                titulo: body.titulo,
                location: body.location,
                ini_mont: body.ini_mont,
                ini_year: body.ini_year,
                end_mont: body.end_mont,
                end_year: body.end_year,
            });

        const educacions = await models.educacions.create({
                nombre: body.universidad,
                titulo: body.titulo2,
               ini_mont: body.ini_mont,
                ini_year: body.ini_year,
            end_mont: body.end_mont,
                end_year: body.end_year,
            });
            const professional = await models.professionals.create({
                nombre: body.nombre,
                profesion: body.profesion,
                gender: body.gender,
                birthdate: body.birthdate,
                identification: body.identification,
                phone: body.phone,
                credentialsId: credential.id,
                addressesId: address.id,
                experienciaId: experiencia.id,
                educacionId: educacions.id
            });

            return res.status(201).send(professional);
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error interno en el servidor");
    }
};

const editProfileProfessional = async (req, res) => {
    try {
        const { body } = req;
        const userId = req.userId;

        /* let foto = fileUpload(body.foto, "/public");
        foto = `http://localhost:5050${foto}`; */

        const area = await models.areas.create({
            area_interest: body.area_interest,
            professionalsId: userId
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

module.exports = {
    addProfessional, editProfileProfessional
};