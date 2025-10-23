const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const conectarDB = require("./config/db");
const metasRoutes = require("./routes/metasRoutes");
const authRoutes = require("./routes/authRoutes");
const finanzasRoutes = require("./routes/finanzasRoutes");

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
app.use("/api/auth", authRoutes);
app.use("/api/finanzas", metasRoutes);
app.use("/api/finanzas", finanzasRoutes);

// Ruta raíz que sirve login.html
app.get('/', (req, res) => {
  const filePath = path.join(__dirnameBase, 'frontend', 'login.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('Error al servir el archivo login.html');
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
