const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");
const Recharge = require("../models/Recharge"); // ✅ Make sure this exists
const crypto = require("crypto");

// ✅ Add a bill to a consumer
router.post("/consumer/add-bill", async (req, res) => {
  const { consumerId, month, amount } = req.body;

  try {
    const consumer = await Consumer.findOne({ consumerId });

    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    consumer.bills.push({ month, amount });
    await consumer.save();

    res.status(200).json({ message: "Bill added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/recharge", async (req, res) => {
  const { adminId, consumerId, amount, paymentMode } = req.body;

  const billId = `BILL-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

  try {
    const recharge = await Recharge.create({
      adminId,
      consumerId,
      amount,
      paymentMode,
      billId,
    });

    res.json({ success: true, id: recharge._id, billId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Recharge failed" });
  }
});

router.get("/consumer/:id", async (req, res) => {
  try {
    const consumer = await Consumer.findOne({ consumerId: req.params.id });

    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.json(consumer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/consumer", async (req, res) => {
  try {
    const { consumerId, name, address, balance, lastPaymentDate } = req.body;

    const newConsumer = new Consumer({
      consumerId,
      name,
      address,
      balance,
      lastPaymentDate,
    });

    await newConsumer.save();
    res.status(201).json({ message: "Consumer added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
