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

  await transporter.sendMail({
    from: `"Finanzas Personales" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = enviarCorreo;
