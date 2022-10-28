// Loading modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const user = require("./routes/user");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("./models/Post");
const Post = mongoose.model("posts");
require("./models/Category");
const Category = mongoose.model("categories");

// const mongoose = require("mongoose");

// Config
// Session
app.use(
  session({
    secret: "curso_de_node",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
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
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("middleware");
  next();
});

// Routes
app.get("/", (req, res) => {
  Post.find()
    .populate("category")
    .sort({ date: "desc" })
    .then((posts) => {
      res.render("index", { posts: posts });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

app.get("/post/:slug", (req, res) => {
  Post.findOne({ slug: req.params.slug })
    .then((post) => {
      if (post) {
        res.render("post/index", { post: post });
      } else {
        req.flash("error_msg", "Esta postagem não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/");
    });
});

app.get("/categories", (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("category/index", { categories: categories });
    })
    .catch((err) => {
      req.flash(
        "error_msg",
        "Houve um erro interno ao carregar a página desta categoria"
      );
      res.redirect("/");
    });
});

app.get("/categories/:slug", (req, res) => {
  Category.findOne({ slug: req.params.slug })
    .then((category) => {
      if (category) {
        Post.find({ category: category._id })
          .then((posts) => {
            res.render("category/posts", { posts: posts, category: category });
          })
          .catch((err) => {
            res.flash("error_msg", "Houve um erro ao listar os posts");
            res.redirect("/");
          });
      } else {
        req.flash("error_msg", "Esta categoria não existe");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash(
        "error_msg",
        "Houve um erro interno ao carregar a página desta categoria"
      );
      res.redirect("/");
    });
});

app.get("/404", (req, res) => {
  res.send("Error 404!");
});

app.get("/posts", (req, res) => {
  res.send("Lista Posts");
});

app.use("/admin", admin);
app.use("/user", user);

// Others
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});
