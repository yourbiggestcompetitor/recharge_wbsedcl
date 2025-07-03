const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const Admin = require("./models/Admin");
const Recharge = require("./models/Recharge");
const Consumer = require("./models/Consumer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sahaa05:Torasaha123@cluster0.3zbkhlc.mongodb.net/quickrecharge"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dianagrace12092005@gmail.com",
    pass: "abtbmwisonzsydob",
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post("/admin/login", async (req, res) => {
  const { employeeId, password } = req.body;
  const admin = await Admin.findOne({ employeeId });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60000);
  admin.otp = otp;
  admin.otpExpires = otpExpires;
  await admin.save();

  await transporter.sendMail({
    from: "your@gmail.com",
    to: admin.email,
    subject: "Admin OTP Login",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent" });
});

app.post("/admin/verify-otp", async (req, res) => {
  const { employeeId, otp } = req.body;
  const admin = await Admin.findOne({ employeeId });

  if (!admin || admin.otp !== otp || new Date() > admin.otpExpires) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  res.json({ success: true });
});

app.get("/admin/consumer/:id", async (req, res) => {
  const consumer = await Consumer.findOne({ consumerId: req.params.id });
  if (!consumer) return res.status(404).json({ error: "Not found" });
  res.json(consumer);
});

const consumerRoutes = require("./routes/cons");
app.use("/api", consumerRoutes);

app.post("/admin/recharge", async (req, res) => {
  const { adminId, consumerId, amount, paymentMode, counterId } = req.body;
  const recharge = new Recharge({
    adminId,
    consumerId,
    amount,
    paymentMode,
    counterId,
  });
  await recharge.save();
  res.json({ message: "Recharge successful", id: recharge._id });
});

app.get("/admin/counter-summary", async (req, res) => {
  const summary = await Recharge.aggregate([
    {
      $group: {
        _id: "$counterId",
        totalAmount: { $sum: "$amount" },
        transactions: { $push: "$$ROOT" },
      },
    },
  ]);
  res.json(summary);
});
app.get("/admin/counter-summary", async (req, res) => {
  try {
    const counters = await Counter.find({}, "_id totalAmount");
    res.json({ success: true, counters });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching counter summary" });
  }
});
``;

app.get("/admin/history/:consumerId", async (req, res) => {
  const { consumerId } = req.params;
  try {
    console.log("Fetching history for consumer:", consumerId);

    if (!db) {
      console.error("Database not connected");
      return res.status(500).json({ error: "Database not connected" });
    }

    const history = await db
      .collection("payments")
      .find({ consumerId: numericId })
      .toArray();

    console.log("Found history:", history);
    res.json(history);
  } catch (error) {
    console.error("Actual error:", error);
    res.status(500).json({ error: "Error fetching payment history" });
  }
});

app.get("/admin/generate-bill/:id", async (req, res) => {
  const txn = await Recharge.findById(req.params.id);
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=bill.pdf");
  doc.pipe(res);
  doc.fontSize(20).text("WBSEDCL Quick Recharge Bill", { align: "center" });
  doc.moveDown();

  doc.text(`Consumer ID: ${txn.consumerId}`);
  doc.text(`Recharge Amount: ₹${txn.amount}`);
  doc.text(`Payment Mode: ${txn.paymentMode}`);
  doc.text(`Date: ${txn.date.toLocaleString()}`);
  doc.end();
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
