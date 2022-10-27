const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("categories");
require("../models/Post");
const Post = mongoose.model("posts");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categories", (req, res) => {
  Category.find()
    .sort({ date: "desc" })
    .then((categories) => {
      res.render("admin/categories", { categories: categories });
    })
    .catch((err) => {
      req.flash("error.msg", "Houve um erro ao listar as categorias");
      res.redirect("/admin");
    });
});

router.get("/categories/add", (req, res) => {
  res.render("admin/addcategories");
});

router.post("/categories/new", (req, res) => {
  let errors = [];

  if (!req.body.name) {
    errors.push({ text: "Nome inválido" });
  }
  if (!req.body.slug) {
    errors.push({ text: "Slug inválido" });
  }
  if (req.body.name.length < 2) {
    errors.push({ text: "Nome da categoria muito curto" });
  }
  if (errors.length > 0) {
    res.render("admin/addcategories", { errors: errors });
  } else {
    const newCategory = {
      name: req.body.name,
      slug: req.body.slug,
    };

    new Category(newCategory)
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria criada com sucesso");
        res.redirect("/admin/categories");
      })
      .catch(() =>
        req.flash(
          "error_msg",
          "Houve um erro ao salvar a categoria, tente novamente!"
        )
      );
  }
});

router.post("/categories/edit", (req, res) => {
  Category.findOne({ _id: req.body.id })
    .then((category) => {
      category.name = req.body.name;
      category.slug = req.body.slug;

      category
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria editada com sucesso!");
          res.redirect("/admin/categories");
        })
        .catch((err) => {
          req.flash(
            "error_msg",
            "Houve um erro interno ao salvar a edição da categoria"
          );
          res.redirect("/admin/categories");
        });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao editar a categoria");
      res.redirect("/admin/categories");
    });
});

router.post("/categories/delete", (req, res) => {
  Category.remove({ _id: req.body.id })
    .then(() => {
      req.flash("success_msg", "Categoria deletada com sucesso!");
      res.redirect("/admin/categories");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao deletar a categoria!");
      res.redirect("/admin/categories");
    });
});

router.get("/posts", (req, res) => {
  Post.find()
    .populate("category")
    .sort({ date: "desc" })
    .then((posts) => {
      res.render("admin/posts", { posts: posts });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as postagens");
      console.log("erro: " + err.message);
      res.redirect("/admin");
    });
});

router.get("/posts/add", (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("admin/addposts", { categories: categories });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar o formulário");
      res.redirect("/admin");
    });
});

router.get("/categories/edit/:id", (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => {
      res.render("admin/editcategories", { category: category });
    })
    .catch((err) => {
      req.flash("error_msg", "Esta categoria não existe");
      res.redirect("/admin/categories");
    });
});

router.post("/posts/new", (req, res) => {
  let errors = [];

  if (req.body.category == "0") {
    errors.push({ text: "Categoria inválida, registre uma categoria" });
  }
  if (errors.length > 0) {
    res.render("admin/addposts", { errors: errors });
  } else {
    const newPost = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category,
      slug: req.body.slug,
    };

    new Post(newPost)
      .save()
      .then(() => {
        req.flash("success_msg", "Postagem criada com sucesso");
        res.redirect("/admin/posts");
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro na criação do post");
        res.redirect("/admin/posts");
      });
  }
});

router.get("/posts/edit/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      Category.find()
        .then((categories) => {
          res.render("admin/editpost", {
            categories: categories,
            post: post,
          });
        })
        .catch((err) => {
          req.flash("error_msg", "Houve um erro ao listar as categorias");
          res.redirect("/admin/posts");
        });
    })
    .catch((err) => {
      req.flash(
        "error_msg",
        "Houve um erro ao carregar o formulário de edição"
      );
      res.redirect("/admin/posts");
    });
});

router.post("/post/edit", (req, res) => {
  Post.findOne({ _id: req.body.id })
    .then((post) => {
      post.title = req.body.title;
      post.slug = req.body.slug;
      post.description = req.body.description;
      post.content = req.body.content;
      post
        .save()
        .then(() => {
          req.flash("success_msg", "Postagem alterada com sucesso!");
          res.redirect("/admin/posts");
        })
        .catch((err) => {
          req.flash("error_msg", "Erro interno");
          res.redirect("/admin/posts")
        });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao salvar a edição");
      res.redirect("/admin/posts");
    });
});

router.get("/posts/delete/:id", (req, res) => {
  Post.remove({_id: req.params.id}).then(() => {
    req.flash("success_msg", "Postagem deletada com sucesso!");
    res.redirect("/admin/posts");
  }).catch(() => {
    req.flash("error_msg", "Houve um erro interno")
    res.redirect("/admin/posts")
  })
})

module.exports = router;
