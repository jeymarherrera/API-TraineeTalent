const models = require("../../database/models");
const paypal = require("paypal-rest-sdk");
const cartController = require("./cart");

const uuid = require("uuid");


const pay = async (req, res) => {
  try {
    const { body } = req;
    const products = body.products;
    const id = parseInt(body.userId);
    const userId = id.toString();
    const orderNumber = uuid.v4();

    const subtotal = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const roundedSubtotal = Math.round(subtotal * 100) / 100;

    const items = products.map((product) => {
      return {
        name: "cursos",
        sku: product.id,
        price: product.price,
        currency: "USD",
        quantity: product.quantity,
      };
    });

    const paymentData = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5050/success",
        cancel_url: "http://localhost:5050/cancel",
      },
      transactions: [
        {
          item_list: {
            items: items,
          },
          amount: {
            total: roundedSubtotal.toFixed(2), 
            currency: "USD",
            details: {
              subtotal: roundedSubtotal.toFixed(2),
            },
          },
          description: "Cursos comprados!",
          orderNumber: orderNumber,
          custom: userId,

        },
      ],
    };

    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.error("Error al crear el pago:", error);
        return res.status(500).json({ message: "Error en el servidor" });
      } else {
        const approvalUrl = payment.links.find((link) => link.rel === "approval_url").href;

        return res.status(200).json({
          redirectUrl: approvalUrl,
        });
      }
    });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

const success = async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const executePayment = {
      payer_id: payerId,
    };

    paypal.payment.execute(paymentId, executePayment, async (error, payment) => {
      if (error) {
        console.error("Error al ejecutar el pago:", error);
        return res.status(500).json({ message: "Error en el servidor" });
      } else {
        const orderNumber = payment.id;
        const purchaseDate = payment.create_time;
        const products = payment.transactions[0].item_list.items;
        const userID = parseInt(payment.transactions[0].custom);
        try {
          const purchasePromises = products.map(async (product) => {
            const productId = product.sku;
            const quantity = product.quantity;

            const newPurchase = await models.purchases.create({
              paymentId: orderNumber,
              date: purchaseDate,
              price: product.price,
              quantity: quantity,
              courseId: productId,
              professionalId: userID,
            });

            console.log("Registro de compra creado:", newPurchase);
          });

          await Promise.all(purchasePromises);

          cartController.removeProducts(userID);
        } catch (error) {
          console.error("Error al crear los registros de compra:", error);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        return res.redirect(
          `http://localhost:5173/carrito/success?orderNumber=${orderNumber}&purchaseDate=${purchaseDate}&totalAmount=${payment.transactions[0].amount.total}`
        );
      }
    });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  pay,
  success,
};
