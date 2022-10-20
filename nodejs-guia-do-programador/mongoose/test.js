const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://johnpetros:joaodev20@cluster0.zibrbsm.mongodb.net/?retryWrites=true&w=majoritymongodb://"
  )
  .then(() => {
    console.log("MongoDB conectado com sucesso");
  })
  .catch((error) => {
    console.error("Houve um erro ao se conectar ao MongoDB: " + error.message);
  });
