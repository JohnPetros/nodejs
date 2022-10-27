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

module.exports = router;
