const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

// Config Template Engine
app.engine('handlebars', handlebars.engine({ 
    defaultLayout: 'main', 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true, 
    },    
}))
app.set("view engine", "handlebars");

// Config Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", function (req, res) {
  Post.findAll({order: [["id", "DESC"]]}).then(function (posts) {
    console.log(posts);
    res.render("home", { posts: posts });
  });
});

app.get("/cad", function (req, res) {
  res.render("form");
});
app.post("/add", function (req, res) {
  Post.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      res.send("Houve um error: " + err.message);
    });
});

app.listen(8081, function () {
  console.log("Servidor rodando na url http://localhost:8081");
});
