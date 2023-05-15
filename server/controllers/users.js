const bcrypt = require("bcryptjs");
const models = require("../../database/models");

const registro = async (req, res) => {
  try {
    const { body } = req;

    password = bcrypt.hashSync(body.password, 10);
    const addUser = await models.users.create({
      email: body.email,
      password: password,
      role: body.role,
    });

    delete addUser.dataValues.password;

    return res.status(201).send(addUser);
  } catch (error) {
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const eliminarUsuario = async(req, res) => {
  try {
      const { userId } = req.params; 
      
      const user = await models.users.findOne({
          where: {
              id: userId,
              statusDelete: false,
          },
      });
      
      if(!user) return res.status(404).send("El usuario no se encontró");   
       
      await user.update({
         statusDelete: true,
      });

      return res.status(200).send("Se ha eliminado exitosamente.");
  } catch (error) {
      console.log(error);
      return res.status(500).send("Lo sentimos ha ocurrido un error");
  };
};

module.exports = { registro};