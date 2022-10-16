const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require("sequelize");

// Config Template Engine
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Conection to MySql database
const sequelize = new Sequelize("test", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

// Routes
app.get("/cad", function (req, res) {
  res.render("form")
});
app.post("/add", function (req, res) {
    res.send("Formulário recebido");
})

app.listen(8081, function () {
  console.log("Servidor rodando na url http://localhost:8081");
});
