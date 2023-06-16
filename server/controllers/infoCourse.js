const { Sequelize, Model } = require("sequelize");
const models = require("../../database/models");



const getSelectedCourse = async (req, res) => {
    try {
        // Obtiene el curso seleccionado de la base de datos
        const { id } = req.params;

        const course = await models.courses.findAll({
            where: {
                id: id
            },
            order: [
                [
                    { model: models.chapters, as: 'courseChapters' },
                    'chapternum',
                    'ASC',
                ],
            ],
            include:
            {
                model: models.chapters,
                as: 'courseChapters',
                include: {
                    model: models.topics,
                    as: "chaptersTopics",
                    separate: true,
                    order: [
                        ['id', 'ASC',]
                    ],

                }
            },
        });

        res.status(200).json({
            success: true,
            message: 'Curso obtenido exitosamente',
            data: course
        });
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el curso',
            error: error.message
        });
    }
}

//Metodos para Capitulos, temas

module.exports = {
    getSelectedCourse,
}