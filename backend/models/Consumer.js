const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  month: String,
  amount: Number,
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
});

const ConsumerSchema = new mongoose.Schema({
  consumerId: String,
  name: String,
  address: String,
  balance: Number,
  lastPaymentDate: Date,
  bills: [billSchema],
});

module.exports = mongoose.model("Consumer", ConsumerSchema);
