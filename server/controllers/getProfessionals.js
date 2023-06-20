
const models = require("../../database/models");

const getAllProfessionals = async (req, res) => {
    try {

        const professionals = await models.professionals.findAll({
            include: [
                {
                    model: models.addresses,
                    as: "addressesProfessionals",
                    required: true,
                },
            ]
        });

        return res.status(200).json({
            success: true,
            message: 'profesionales obtenidos exitosamente',
            data: professionals,
        });

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({
                success: false,
                message: 'Error al obtener los profesionales',
                error: error.message,
            });
    }
};

const getProfessionals = async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        let languajes = body.input1;
        let experience = body.input2;
        let residency = body.input3;
        let area_interest = body.input4;
        let salary_expectation = body.input5;

        const professionals = await models.professionals.findAll({
            where: {

            },
            include: [
                {
                    model: models.addresses,
                    as: "addressesProfessionals",
                    required: true,
                },
                {
                    model: models.credentials,
                    as: "credentialsProfessionals",
                    required: true,
                },
            ]
        });

        return res.status(200).json({
            success: true,
            message: 'profesionales obtenidos exitosamente',
            data: professionals,
        });

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({
                success: false,
                message: 'Error al obtener los profesionales',
                error: error.message,
            });
    }
};

module.exports = {
    getAllProfessionals,
    getProfessionals
};