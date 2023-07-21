const models = require("../../database/models");
const paypal = require("paypal-rest-sdk");
const cartController = require("./cart");

const pay = async (req, res) => {
  const { body } = req;
  const roundedTotal = Math.round(body.total * 100) / 100;
  const productId = body.courseId;
  const userId = parseFloat(body.userID);
  const quantity = body.quantity;


  const paymentData = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.APP_BASE_URL}/success`,
      cancel_url: `${process.env.APP_BASE_URL}/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "hat",
              sku: productId,
              price: roundedTotal.toFixed(2),
              currency: "USD",
              quantity: quantity,
              tax: userId, //en realidad se esta enviando el id del usuario
            },
          ],
        },
        amount: {
          total: roundedTotal.toFixed(2),
          currency: "USD",
        },
        description: "Curso comprado!",
      },
    ],
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.error("Error al crear el pago:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    } else {
      const approvalUrl = `${payment.links.find((link) => link.rel === "approval_url").href
        }`;

      return res.status(200).json({
        redirectUrl: approvalUrl,
      });
    }
  });
};

const success = async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const executePayment = {
      payer_id: payerId,
    };

    paypal.payment.execute(
      paymentId,
      executePayment,
      async (error, payment) => {
        if (error) {
          console.error("Error al ejecutar el pago:", error);
          return res.status(500).json({ message: "Error en el servidor" });
        } else {
          const orderNumber = payment.id;
          const purchaseDate = payment.create_time;
          const totalAmount = payment.transactions[0].amount.total;
          const productId = payment.transactions[0].item_list.items[0].sku;
          const quantity = payment.transactions[0].item_list.items[0].quantity;
          const userID = parseInt(payment.transactions[0].item_list.items[0].tax);

          try {
            const newPurchase = await models.purchases.create({
              paymentId: orderNumber,
              date: purchaseDate,
              price: totalAmount,
              quantity: quantity,
              courseId: productId,
              professionalId: userID,
            });

            console.log("Registro de compra creado:", newPurchase);

            //santiago

            cartController.removeProducts(userID);
          } catch (error) {
            console.error("Error al crear el registro de compra:", error);
            return res.status(500).json({ message: "Error en el servidor" });
          }

          return res.redirect(
            `http://localhost:5173/carrito/success?orderNumber=${orderNumber}&purchaseDate=${purchaseDate}&totalAmount=${totalAmount}`
          );
        }
      }
    );
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  pay,
  success,
};
