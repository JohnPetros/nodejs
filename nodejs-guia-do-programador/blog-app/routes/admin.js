const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("categories");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
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
  Category.remove({_id: req.body.id}).then(() => {
    req.flash("success_msg", "Categoria deletada com sucesso!");
    res.redirect("/admin/categories")
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao deletar a categoria!");
    res.redirect("/admin/categories")
  })
})

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

module.exports = router;
