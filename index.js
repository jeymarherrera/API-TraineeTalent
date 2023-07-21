const { PORT } = require("./config/config");
const { db } = require("./config/database");
const { server } = require("./server/index");


db.authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
    server.listen(PORT, () => {
      console.log(`Servidor esta corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "No se ha podido realizar la conexion a la Base de Datos:",
      err
    );
  });
