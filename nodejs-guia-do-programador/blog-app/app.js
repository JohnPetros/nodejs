// Loading modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
// const mongoose = require("mongoose");

// Config
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// Mongoose


// Public
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/admin", admin);

// Others
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});
