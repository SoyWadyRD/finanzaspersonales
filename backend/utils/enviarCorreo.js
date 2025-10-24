const nodemailer = require("nodemailer");

const enviarCorreo = async (to, subject, html) => {
  console.log("✅ Iniciando proceso para enviar correo...");
  
  // Configuración del transportista
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,  // SSL se usa solo en puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    logger: true,   // Habilita logs para ver detalles
    debug: true,    // Habilita depuración para ver detalles de la conexión
    socketTimeout: 30000,  // Timeout para la conexión (30 segundos)
    connectionTimeout: 30000, // Timeout para la conexión inicial (30 segundos)
  });

  console.log(`🛠️ Configuración del transporter:
  Host: ${process.env.SMTP_HOST}
  Puerto: ${process.env.SMTP_PORT}
  Seguridad SSL: ${process.env.SMTP_PORT == 465 ? 'Sí' : 'No'}`);

  try {
    // Intentamos enviar el correo
    console.log("📧 Intentando enviar correo...");
    const info = await transporter.sendMail({
      from: `"Finanzas Personales" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log(`✅ Correo de verificación enviado a ${to} con éxito. Info: ${JSON.stringify(info)}`);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error.message);
    console.log("🛑 Detalles del error:", error);
    throw new Error("No se pudo enviar el correo de verificación.");
  }
};

module.exports = enviarCorreo;
