const nodemailer = require("nodemailer");

const enviarCorreo = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Finanzas Personales" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
    console.log(`Correo de verificación enviado a ${to}`);
  } catch (error) {
    console.error(`Error al enviar el correo: ${error.message}`);
    throw new Error("No se pudo enviar el correo de verificación.");
  }
};

module.exports = enviarCorreo;
