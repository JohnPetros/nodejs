const mongoose = require("mongoose");

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

// Setting model
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
  },
});

// Setting Collection
mongoose.model("users", UserSchema);

const Victor = mongoose.model("users");

new Victor({
  name: "John",
  lastName: "Doe",
  email: "john@doe.com",
  age: 19,
  country: "EUA",
})
  .save()
  .then(() => {
    console.log("Usuário cadastrado com sucesso!");
  })
  .catch((error) => {
    console.log("Houve um erro ao registrar o usuário: " + error);
  });
