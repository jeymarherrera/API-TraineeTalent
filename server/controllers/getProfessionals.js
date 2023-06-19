
const models = require("../../database/models");

const getProfessionals = async (req, res) => {
    try {
        const { body } = req;

        const professionals = await models.professionals.findAll({
            where:{
                
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
    getProfessionals
};