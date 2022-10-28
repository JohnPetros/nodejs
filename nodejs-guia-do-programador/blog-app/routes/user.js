const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", (req, res) => {
  let errors = [];

  if (!req.body.name) {
    errors.push({
      text: "Nome inválido",
    });
  }

  if (!req.body.email) {
    errors.push({
      text: "E-mail inválido",
    });
  }

  if (!req.body.password) {
    errors.push({
      text: "Senha inválida",
    });
  }
  if (req.body.password.length < 4) {
    errors.push({
      text: "Senha muito curta",
    });
  }

  if (req.body.password != req.body.repeatPassword) {
    errors.push({
      text: "As senhas são muito diferentes, tente novamente!",
    });
  }

  if (errors.length > 0) {
    res.render("user/register", { errors: errors });
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          req.flash(
            "error_msg",
            "Já existe uma conta com este e-mail no nosso sistema!"
          );
          res.redirect("/user/register");
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });

          bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
              if (error) {
                req.flash("error_msg", "Houve um erro ao salvar o usuário");
                res.redirect("/");
              }
              newUser.password = hash;

              newUser
                .save()
                .then(() => {
                  req.flash("success_msg", "Usuário criado com sucesso");
                  res.redirect("/");
                })
                .catch((err) => {
                  req.flash("error_msg", "Houve um erro ao salvar o usuário");
                  res.redirect("/user/register");
                });
            });
          });
        }
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/user/register");
      });
  }
});

router.get("/login", (req, res) => {
    res.render("user/login")
})

module.exports = router;
