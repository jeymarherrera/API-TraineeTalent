const models = require("../../database/models");
const jwt = require("jsonwebtoken");

const addProduct = async (req, res) => {
  const { courseId, quantity, precio } = req.body;
  const userId = req.userId;
  const userRole = req.role;
  let userType = "";

  if (userRole === "Profesional") {
    userType = "professionalId";
  } else if (userRole === "Company") {
    userType = "companyId";
  }


  models.carts
    .findOne({ where: { courseId } })
    .then((cartItem) => {
      if (cartItem) {
        cartItem.quantity += quantity;
        return cartItem.save();
      } else {
        return models.carts.create({
          courseId,
          quantity,
          precio,
          [userType]: userId,
        });
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Producto agregado a la canasta de compras",
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};

const removeProducts = (userId) => {
  models.carts
    .destroy({
      where: {
        professionalId: userId,
      },
    })
    .then((rowsDeleted) => {
      if (rowsDeleted > 0) {
        console.log(
          "Se eliminaron las entradas del carrito del usuario con ID:",
          userId
        );
      } else {
        console.log(
          "No se encontraron entradas del carrito para el usuario con ID:",
          userId
        );
      }
    })
    .catch((error) => {
      console.error("Error al eliminar las entradas del carrito:", error);
    });
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  models.carts
    .destroy({ where: { professionalId: id } })
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "Producto eliminado de la canasta" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};

const removeSelectProduct = async (req, res) => {
  const { professionalId, courseId } = req.params;

  models.carts
    .destroy({ where: { professionalId: professionalId, courseId: courseId } })
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "Producto eliminado de la canasta" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};

const updateQuantity = (req, res) => {};

async function getAllProducts(req, res) {


  try {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado");
    }

    const token = authHeader.substring(7);
    const decoded = jwt.decode(token);

    const userId = decoded.userId;
    const userRole = decoded.role;

    let userType = "";

    if (userRole === "Profesional") {
      userType = "professionalId";
    } else if (userRole === "Company") {
      userType = "companyId";
    }

    const products = await models.carts.findAll({
      where: {
        [userType]: userId
      },
      include: [
        {
          model: models.courses,
          as: "course",
          attributes: ["title", "precio", "image" ],
        },
      ],
    });

    const productData = products.map((product) => product.toJSON());

    console.log(productData);

    return res.status(200).json({
      success: true,
      message: "Success",
      data: productData,
    });
  } catch (error) {
    console.error("Error al obtener los productos de la base de datos:", error);
    return res
      .status(500)
      .send("Error al obtener los productos de la base de datos");
  }
}

const getCartContent = (req, res) => {
  models.carts
    .findAll({
      include: [
        {
          model: models.courses,
          as: course,
          attributes: ["title", "precio"],
        },
      ],
    })
    .then((cartItems) => {
      res.status(200).json({ success: true, cartItems });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};

module.exports = {
  addProduct,
  removeProducts,
  removeSelectProduct,
  removeProduct,
  updateQuantity,
  getCartContent,
  getAllProducts,
};
