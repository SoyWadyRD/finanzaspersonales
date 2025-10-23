const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const conectarDB = require("./config/db");
const metasRoutes = require("./routes/metasRoutes");
const authRoutes = require("./routes/authRoutes");
const finanzasRoutes = require("./routes/finanzasRoutes");  // Asegúrate de que la ruta sea correcta

dotenv.config();

// Conectar a la base de datos
conectarDB();

const app = express();

// Directorio para servir archivos estáticos
const __dirnameBase = path.resolve(); // Define __dirnameBase
app.use(express.static(path.join(__dirnameBase, "frontend"))); // Sirve todos los archivos estáticos desde el directorio frontend

// Sirve CSS y JS específicos si están en carpetas dentro de frontend
app.use(express.static(path.join(__dirnameBase, 'frontend', 'css')));
app.use(express.static(path.join(__dirnameBase, 'frontend', 'js')));

// Middlewares
app.use(express.json());

// Rutas API
app.use("/api/auth", authRoutes);  // Asegúrate de que las rutas de auth estén antes
app.use("/api/finanzas", metasRoutes);
app.use("/api/finanzas", finanzasRoutes);

// Ruta para restablecer contraseña (debe estar antes de la ruta comodín)
app.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;
  console.log("Token recibido en la ruta /reset-password/:token:", token);
  
  if (!token) {
    return res.status(400).send("Token no válido");
  }

  try {
    const filePath = path.join(__dirnameBase, 'frontend', 'reset-password.html');
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error al cargar la página de restablecimiento:", error);
    res.status(500).send("Error al cargar la página de restablecimiento.");
  }
});

// Ruta para login.html
app.get('/login', (req, res) => {
  const filePath = path.join(__dirnameBase, 'frontend', 'login.html');
  res.sendFile(filePath);
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
