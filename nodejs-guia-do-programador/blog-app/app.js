// Loading modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");

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
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://johnpetros:joaodev20@cluster0.zibrbsm.mongodb.net/?retryWrites=true"
  )
  .then(() => {
    console.log("MongoDB conectado com sucesso");
  })
  .catch((error) => {
    console.error("Houve um erro ao se conectar ao MongoDB: " + error.message);
  });

// Public
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/admin", admin);

// Others
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});
