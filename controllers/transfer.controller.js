const { where } = require("sequelize");
const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");

exports.makeTransfer = async (req, res) => {
  const { amount, accountNumber, senderUserId } = req.body;
  

  // buscamos el usuario que recibe por numero de cuenta
  const userRec = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });
// validamos que el numero de cuenta exista
  if (userRec === null) {
    return res.status(404).json({
      status: "error",
      message: "acount no found",
    });
  }

  const receiverUserId = userRec.id;

  // Buscamos el id del usuario que envia
  const userEnv = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });
// Validamos que el usuario que envia exista
  if (userEnv === null) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }



  //Validamos que el usuario que envia tenga saldo suficiente para la transferencia

  if (amount >= userEnv.amount) {
    return res.status(404).json({
      status: "error",
      message: "Do not have sufficient funds",
    });
  }

  //Descontamos el saldo del usuario que envia y lo sumamos al destinatario

  const newAmountUserMakeTransfer = Number(userEnv.amount) - Number(amount);
  const newAmountUserReceiver = Number(userRec.amount) + Number(amount);

  await userEnv.update({ amount: newAmountUserMakeTransfer });
  await userRec.update({ amount: newAmountUserReceiver });

  // Creamos la Transferencia

  await Transfer.create({ amount, senderUserId, receiverUserId });

  // Confirmamos la trnsferencia

  res.status(200).json({
    status: "success",
    message: "successful transfer",
  });
};