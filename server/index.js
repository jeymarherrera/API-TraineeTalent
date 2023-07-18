const express = require("express");
const cookieParser = require("cookie-parser");
const { router } = require("./routes/index");
const server = express();
const path = require("path");
const fs = require('fs');
 // Agregar esta línea

const cors = require("cors");

server.use(express.json());
server.use(cookieParser());


server.use(cors({ origin: true, credentials: true }));
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Witd, Content-Type, Accept, Json"
  );
  next();
});

server.use(router);
// Configurar carpeta pública
const publicFolderPath = 'C:/xampp/htdocs/API-TraineeTalent/public';

server.use("/public", express.static(publicFolderPath));

server.get("/public/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `${publicFolderPath}/${fileName}`;

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (error) => {
      if (error) {
        console.error("Error al descargar el archivo:", error);
        res.status(500).send("Error al descargar el archivo");
      }
    });
  } else {
    res.status(404).send("Archivo no encontrado");
  }
});

module.exports = { server };
