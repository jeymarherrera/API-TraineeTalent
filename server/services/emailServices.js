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

async function sendNotificacionProfesional(email) {
    const message = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: 'TraineeTalent - Usted ha sido contactado',
        html: `<body>
                <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
                    <h1>¡Enhorabuena!</h1>
                </div>

                <div style="text-align: center;">
                    <img style="width: 50px; height: 50px; margin: 0 auto; margin-top: 5px;" src="https://i.imgur.com/jhNyYxZ.png" alt="">
                </div>

                <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        Usted ha sido contactado por una empresa, porfavor dirigirse a su cuenta de TraineeTalent para mas información
                    </p>
                </div>
            
                <div style="text-align: center; background-color: #f2f2f2; padding: 20px;">
                    <p style="font-size: 14px; color: #666;">
                        Este es un mensaje generado automáticamente. Por favor, no respondas a este correo.
                    </p>
                </div>
                </body>`,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`El mensaje fue enviado: ${info.messageId}`);
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar el correo electrónico');
    }
}


module.exports = { sendPasswordEmail, sendNotificacionProfesional };