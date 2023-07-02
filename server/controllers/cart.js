const models = require("../../database/models");

const addProduct = async (req, res) => {
  const { courseId, quantity } = req.body;
  console.log(courseId);
  models.cart
    .findOne({ where: { courseId } })
    .then((cartItem) => {
      if (cartItem) {
        cartItem.quantity += quantity;
        return cartItem.save();
      } else {
        return models.cart.create({
          courseId,
          quantity,
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

const removeProduct = async (req, res) => {
  const { id } = req.params;

    models.cart.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true, message: 'Producto eliminado de la canasta' });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
};

const updateQuantity = (req, res) => {};

async function getAllProducts(req, res) {
  try {
    const products = await models.cart.findAll({
      include: [
        {
          model: models.courses,
          as: "course",
          attributes: ["title", "price"],
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
  models.cart
    .findAll({
      include: [
        {
          model: models.courses,
          as: course,
          attributes: ["title", "price"],

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

module.exports = { addProduct, removeProduct, updateQuantity, getCartContent, getAllProducts };
