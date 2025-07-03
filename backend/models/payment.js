const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  consumerId: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  txnId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
