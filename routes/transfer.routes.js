const { Router } = require("express");
const { makeTransfer } = require("../controllers/transfer.controller");

const router = Router();

router.post("/",makeTransfer);// Ruta de transferencia de usuario
module.exports ={
    routerTransfer: router,
};