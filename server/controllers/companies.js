const bcrypt = require("bcryptjs");
const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");

const addCompany = async (req, res) => {
  try {
    const { body } = req;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const findEmail = await models.credentials.findOne({
      where: { email: body.email },
    });

    if (findEmail) {
      res.json({ message: "Correo en uso!" });
    } else {
      password = bcrypt.hashSync(body.password, 10);
      const credential = await models.credentials.create({
        email: body.email,
        password,
        role: "Company",
      });

      const address = await models.addresses.create({
        country: body.country,
        city: body.city,
        state: body.state,
        street: body.street,
      });

      const company = await models.companies.create({
        name: body.name,
        sector: body.sector,
        image,
        credentialsId: credential.id,
        addressesId: address.id,
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

//proyectos

const crearProyecto = async (req, res) => {
  try {
    const { body } = req;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado");
    }

    const token = authHeader.substring(7);
    const decoded = jwt.decode(token);

    const companyId = decoded.userId;

    const nuevoProyecto = await models.Project.create({
      companyId: companyId,
      title: body.titulo,
      description: body.descripcion,
      salary: body.salario,
      location: body.ubicacion,
      duration: body.duracion,
      publicationDate: Sequelize.literal('CURRENT_TIMESTAMP'), 
      employmentType: body.tipoEmpleo,
      experienceLevel: body.experiencia,
    });

    res
      .status(201)
      .json({
        message: "Proyecto creado exitosamente",
        proyecto: nuevoProyecto,
      });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res
      .status(500)
      .json({ message: "Error al crear el proyecto. Inténtalo nuevamente." });
  }
};

async function getAllProjects(req, res) {
  try {
    const projects = await models.Project.findAll({
      include: [
        {
          model: models.companies,
          as: "company",
          attributes: ["name"],
        },
      ],
    });

    const projectData = projects.map((project) => project.toJSON());

    console.log(projectData);

    return res.status(200).json({
      success: true,
      message: "Success",
      data: projectData,
    });
  } catch (error) {
    console.error("Error al obtener los proyectos de la base de datos:", error);
    return res
      .status(500)
      .send("Error al obtener los proyectos de la base de datos");
  }
}

const getSelectedProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await models.Project.findOne({ where: { id } });

    if (!project) {
      return res.status(404).json({ message: "No se encontró el proyecto" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  addCompany,
  getAllProjects,
  getSelectedProject,
  crearProyecto
};
