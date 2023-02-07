const { Router } = require("express");
const {
  createUser,
  loginUser,
  allTranfer,
} = require("../controllers/user.controller");

const router = Router();

router.post("/signup", createUser); // ruta de creacion de Usuario
router.post("/login", loginUser); // ruta de login de usuario por cuenta y contraseña
router.get("/:id/history", allTranfer); //  Obtiene todas las transferencias hechas por el usuario en sesión

module.exports = {
  userRouter: router,
};
