const config = require('../../config/config');
const transporter = config.TRANSPORTER;

async function sendPasswordEmail(email, randomKey) {
    const message = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: 'Recuperar Contraseña',
        html: `<p>Para recuperar su contraseña ingrese la siguiente clave temporal: ${randomKey}</p><p>Recuerde cambiar su contraseña al ingresar al sistema.</p>`,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`El mensaje fue enviado: ${info.messageId}`);
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar el correo electrónico');
    }
}

module.exports = { sendPasswordEmail };