const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Sejam bem-vindos ao meu App!");
});

app.get("/sobre", function (req, res) {
  res.send("Minha página sobre");
});
app.get("/blog", function (req, res) {
  res.send("Meu blog");
});

app.get("/ola/:nome/:cargo/:idade", function (req, res) {
  //   res.send(req.params);
  res.send(
    "<h1>Olá " +
      req.params.nome +
      "</h1>" +
      "<h2>Seu cargo é " +
      req.params.cargo +
      "</h2>" +
      "<h2>Sua idade é " +
      req.params.idade +
      "</h2>"
  );
});

app.listen(8081, function (req, res) {
  console.log("Servidor rodando na url http://localhost:8081");
});
