const http = require("http");

http
  .createServer(function (request, response) {
    response.end("Hello, world!");
  })
  .listen(8081);

console.log("Servidor Rodando!");
