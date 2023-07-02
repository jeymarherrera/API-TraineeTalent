const models = require("../../database/models");
const paypal = require("paypal-rest-sdk");
const { removeProduct } = require("./cart");

const pay = async (req, res) => {
  const { body } = req;
  const roundedTotal = Math.round(body.total * 100) / 100;
  const { courseId, quantity, total } = req.body;

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
        amount: {
          total: roundedTotal.toFixed(2),
          currency: "USD",
        },
        description: "Descripción del pago",
      },
    ],
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.error("Error al crear el pago:", error);
      return res.status(500).json({ message: "Error en el servidor" });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      const approvalUrlWithExtraInfo = `${approvalUrl}?courseId=${courseId}&quantity=${quantity}`;

      return res.status(200).json({
        redirectUrl: approvalUrlWithExtraInfo,
      });
    }
  });
};

const success = async (req, res) => {
  try {
    console.log(req.query);
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

          try {
            const newPurchase = await models.purchases.create({
              paymentId: orderNumber,
              date: purchaseDate,
              price: totalAmount,
              courseId: 1,
              quantity: 2,
            });

            console.log("Registro de compra creado:", newPurchase);
            removeProduct();

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
