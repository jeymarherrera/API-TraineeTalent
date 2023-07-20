
const models = require("../../database/models");
const { Op } = require("sequelize");

const getAllProfessionals = async (req, res) => {
    try {

        const professionals = await models.professionals.findAll({
            order: [
                ['id', 'ASC']
            ],
            include: [
                {
                    model: models.addresses,
                    as: "addressesProfessionals",
                },
                {
                    model: models.experiencia,
                    as: "experienciaProfessionals",
                },
                {
                    model: models.educacions,
                    as: "educacionsProfessionals",
                },
                {
                    model: models.areas,
                    as: "areasProfessionals",
                    include: {
                        model: models.lenguaje,
                        as: "lenguajeProfessionals",
                    }
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

        console.log(body.input1.length)
        console.log(body);

        let languajes;
        if (body.input1.length === 0) {
            languajes = '';
        }
        else {
            languajes = body.input1;
        }
        let residency = body.input2;
        let area_interest = body.input3;
        let salary_expectation = body.input4;

        console.log(languajes);

        const professionals = await models.professionals.findAll({
            where: {
                [Op.and]: [
                    salary_expectation ? {
                        salary_expectation: {
                            [Op.lte]: salary_expectation
                        },
                    } : {},
                    area_interest ? {
                        profesion: {
                            [Op.iLike]: area_interest
                        },
                    } : {},
                    residency ? {
                        '$addressesProfessionals.country$': {
                            [Op.iLike]: residency
                        },
                    } : {},
                    languajes ? {
                        '$areasProfessionals.lenguajeProfessionals.titulo$': {
                            [Op.iLike]: {
                                [Op.any]: languajes
                            }
                        },
                    } : {},
                ],
            },
            include: [
                {
                    model: models.addresses,
                    as: "addressesProfessionals",
                },
                {
                    model: models.experiencia,
                    as: "experienciaProfessionals",
                },
                {
                    model: models.areas,
                    as: "areasProfessionals",
                    include: {
                        model: models.lenguaje,
                        as: "lenguajeProfessionals",
                    }
                },
            ],
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