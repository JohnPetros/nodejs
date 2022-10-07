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

const Postagem = sequelize.define("postagens", {
  titulo: {
    type: Sequelize.STRING,
  },
  conteudo: {
    type: Sequelize.TEXT,
  },
});

// Postagem.sync({ force: true });
// Postagem.create({
//     titulo: "Um título qualquer",
//     conteudo: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam consectetur animi porro rerum amet. Exercitationem, voluptates tempore. Officia reiciendis velit quisquam recusandae possimus tenetur commodi odio, corrupti eligendi ducimus quos?"
// })

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING,
    },
    sobrenome: {
        type: Sequelize.STRING,
    },
    idade: {
        type: Sequelize.INTEGER,
    },
    email: {
        type: Sequelize.STRING,
    }
});

// Usuario.sync({ force: true });
Usuario.create({
    nome: "João Pedro",
    sobrenome: "Lima",
    idade: 20,
    email: "joao@example.com",
})