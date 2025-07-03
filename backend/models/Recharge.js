const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema({
  adminId: String,
  consumerId: String,
  amount: Number,
  paymentMode: String,
  billId: String,
  counterId: String,
  date: { type: Date, default: Date.now },
});

const Recharge = mongoose.model("Recharge", rechargeSchema);
module.exports = Recharge;
