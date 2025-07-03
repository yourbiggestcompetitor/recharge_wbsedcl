const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  employeeId: String,
  password: String,
  email: String,
  otp: String,
  otpExpires: Date,
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
