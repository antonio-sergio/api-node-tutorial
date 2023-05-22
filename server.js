const express = require("express");
const cors = require("cors");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

//pega os modelos e sincroniza com a tabela de dados
const sync = () => {
  db.sequelize.sync(
    { force: true }
  )
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
}
sync();
//ao rodar a primeira vez a linha abaixo deverá ser descomentada
//nas demais execuções ela deverá permanecer comentada
//e efetuar a sicronização só quando houver alteração nos modelos
//importante saber que a sincronização apagará os dados das tabelas

app.get("/", (req, res) => {
  res.json({ message: "App is running" });
});

require("./src/routes/user-route")(app);
require("./src/routes/address-route")(app);

const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});