const Sequelize = require("sequelize");

// Conection to MySql database
const sequelize = new Sequelize("postapp", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
