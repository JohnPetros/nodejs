const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category")
const Category = mongoose.model("categories")

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
});

router.get("/categories", (req, res) => {
  res.render("admin/categories");
});

router.get("/categories/add", (req, res) => {
  res.render("admin/addcategories");
});

router.post("/categories/new", (req, res) => {
  const newCategory = {
    name: req.body.name,
    slug: req.body.slug
  }

  new Category(newCategory).save().then(() => console.log("Categoria salva com sucesso.")).catch(() => console.error("Erro ao salvar."))
})

module.exports = router;
