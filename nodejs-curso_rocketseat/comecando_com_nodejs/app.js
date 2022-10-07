const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/primeira-rota", (request, response) => {
  return response.json({
    message: "Acessou a primeira nodemon",
  });
});

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

/*
- POST => Inserir dados
- GET => Buscar dados
- PUT => Alterar dados
- DELETE => Deletar dados

- Body => 
- Params => 
*/

app.post("/products", (request, response) => {
  const { name, price } = request.body;

  const product = {
    id: randomUUID(),
    name: name,
    price: price,
  };

  products.push(product);

 productFile()

  return response.json(product);
});

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile()

  return response.json({ message: "Produto alterado com sucesso." });
});

app.delete("/products/:id", (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ message: "Produto removido com sucesso." });
});

function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto Inserido");
    }
  });
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
