
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

        console.log(body);

        let languajes = body.input1;
        let residency = body.input2;
        let area_interest = body.input3;
        let salary_expectation = body.input4;

        console.log(languajes);

        // let queryLanguajes = '';
        // function setQueryLanguajes() {
        //     let queryaux = '';
        //     languajes.forEach((element, index) => {
        //         if (Object.is(languajes.length - 1, index)) {
        //             queryaux = `${queryaux}${element}`;
        //         } else {
        //             queryaux = queryaux + `${element} AND `;
        //         }
        //     });
        //     return queryaux;
        // }
        // queryLanguajes = setQueryLanguajes();
        // console.log(queryLanguajes);

        const professionals = await models.professionals.findAll({
            where: salary_expectation ? {
                salary_expectation: {
                    [Op.lte]: salary_expectation
                },
            } : {},
            where: area_interest ? {
                profesion: {
                    [Op.iLike]: area_interest
                },
            } : {},
            include: [
                {
                    model: models.addresses,
                    as: "addressesProfessionals",
                    where: residency ? {
                        country: {
                            [Op.iLike]: residency
                        },
                    } : {},
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
                        required: false,
                        where: languajes ? {
                            titulo: {
                                [Op.in]: languajes,
                            },
                        } : {},
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

module.exports = {
    getAllProfessionals,
    getProfessionals
};