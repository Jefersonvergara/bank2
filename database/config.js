const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost", //direccion donde se encuentra la base de datos
  username: "postgres", //usuario por defecto postgre
  password: "junior1112", //contraseña que se digita en postgre
  database: "banks", //nombre de la base de datos
  logging: false,
});

module.exports = { db };
