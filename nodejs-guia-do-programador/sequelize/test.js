const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Sucesso ao conectar");
  })
  .catch(function (error) {
    console.log("Falha ao conectar: " + error.message);
  });
