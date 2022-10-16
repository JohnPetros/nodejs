const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// Config Template Engine
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Config Body Parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Routes
app.get("/cad", function (req, res) {
  res.render("form");
});
app.post("/add", function (req, res) {
  req.body.content;
  res.send(`Texto: ${req.body.title} <br> Conteúdo: ${req.body.content}`);
});

app.listen(8081, function () {
  console.log("Servidor rodando na url http://localhost:8081");
});
